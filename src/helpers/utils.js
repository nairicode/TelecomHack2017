import {AsyncStorage} from 'react-native';
import moment from 'moment';
import CryptoJS from 'crypto-js';
// import rand from "random-key";
import SmsAndroid  from 'react-native-get-sms-android';
import Contacts from 'react-native-contacts';

import Config from '../config';
import _ from 'underscore';


export const filterCalls = (calls) => {
    let outgoing = _.filter(calls, ({ callType, callDuration, phoneNumber }) => {
        return callType === "OUTGOING" && +callDuration > 0 && phoneNumber.length >= 6;
    });


    let grouped = groupByMonths(outgoing);
    /*
    * {
    *  9: [
    *    {phoneNumber, callDuration}
    *  ]
    * }
    * */

    let groupedByTypes = {};
    _.each(grouped, (arr, month) => {
        let _byTypes = _.groupBy(arr, call => numberWithoutCode(call.phoneNumber));
        let monthlyFee = 0, allDuration = 0;
        /*
         * {
         *  inline: [
         *    {phoneNumber, callDuration}
         *  ],
         *  outline: [
         *    {phoneNumber, callDuration}
         *  ],
         *  foreign: [
         *    {phoneNumber, callDuration}
         *  ],
         * }
         * */

        _.each(_byTypes, (_calls, type) => {
            let fee = getMonthlyFeeForCalls(type, _calls),
                duration = getCallsDuration(_calls);
                _byTypes[type] = {
                    calls: _calls,
                    fee,
                    duration
                };

            allDuration += duration;
            monthlyFee += fee;
        });

        groupedByTypes[month] = {calls: _byTypes, fee: monthlyFee, key: Math.random(), duration: allDuration};
    });

    return groupedByTypes;
};

export const filterMessages = (messages) => {
    let grouped = groupByMonths(messages);
    let groupedByTypes = {};
    _.each(grouped, (arr, month) => {
        let _byTypes = _.groupBy(messages, message => numberWithoutCode(message.to));
        let monthlyFee = 0;

        _.each(_byTypes, (_messages, type) => {
            let fee = getMonthlyFeeForMessages(type, _messages);
            _byTypes[type] = {
                messages: _messages,
                fee
            };

            monthlyFee += fee;
        });

        groupedByTypes[month] = {messages: _byTypes, fee: monthlyFee, key: Math.random(), count: messages.length};
    });

    return groupedByTypes;
};

export const numberWithoutCode = (number) => {
    let type;

    if(number[0] === '+' && number.slice(1, 4) === "374") {
        type = Config.inlineCodes.indexOf(number.slice(4, 6)) > -1? 'inline' : 'outline';
    } else if(number[0] === '+' && number.slice(1, 4) !== "374") {
        type = 'foreign'
    } else {
        type = Config.inlineCodes.indexOf(number.slice(1, 3)) > -1? 'inline' : 'outline';
    }

    return type;
};

export const isFixedNumber = (number) => {

};

export const groupByMonths = (arr) => {
    // console.log(arr);
    return _.groupBy(arr, (result) => moment(+result.callDate).month());
};

export const getCallsDuration = (calls) => {
    return calls.reduce((sum, call) => sum += +call.callDuration,0);
};

export const getMonthlyFeeForCalls = (type, calls) => {
    let price = Config.fees.call[type];

    let totalDuration = getCallsDuration(calls);

    let durationInMinutes = Math.floor(totalDuration / 60);

    return price * durationInMinutes;
};

export const getMonthlyFeeForMessages = (type, messages) => {
    let price = Config.fees.sms[type];

    let count = messages.length;

    return price * count;
};

export const generateRandomKey = () => {
    return rand.generate();
};

export const encryptMessage = (message, key) => {
    return CryptoJS.AES.encrypt(message, key.toString()).toString();
};

export const dencryptMessage = (message, key) => {
    return CryptoJS.AES.decrypt(message, key.toString()).toString(CryptoJS.enc.Utf8);
};

export const setKey = async (key, val) => {
    await AsyncStorage.setItem(key, val);
};

export const getKey = async (num1, num2) => {
    return AsyncStorage.getItem((parseInt(num1) + parseInt(num2)).toString());
};

export const getAllContacts = () => {
    return new Promise(res => {
        Contacts.getAll( (err, contacts) => {
            let _contacts = {};
            _.each(contacts, contact => {
                if (contact.phoneNumbers[0]) {
                    _contacts[contact.phoneNumbers[0].number.replace(/ /g, '').replace('+374', '0')] = contact.givenName;
                }
            });

            res(_contacts);
        })
    });
};

export const getAllMessages = async () => {
    let read = await _getAllMessages();
    let unread = await _getAllMessages(0);
    return _.groupBy([...unread, ...read].filter(el => !_.isNaN(parseInt(el.address))), 'address');
};

const _getAllMessages = (read=1) => {
    let filter = {
        box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // the next 4 filters should NOT be used together, they are OR-ed so pick one
        read, // 0 for unread SMS, 1 for SMS already read
    };

    return new Promise(res => {
        SmsAndroid.list(JSON.stringify(filter), (fail) => null,
            (count, smsList) => {
                let arr = JSON.parse(smsList);
                _.each(arr, el => el.address = el.address.replace('+374', '0'));
                res(arr);
            });
    })
};

export const getAllMessagesByPhone = (phone) => {
    let filter = {
        box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // the next 4 filters should NOT be used together, they are OR-ed so pick one
        read: 1, // 0 for unread SMS, 1 for SMS already read
    };

    return new Promise(async res => {
        let allMessages = await getAllMessages(1);
        let myMessage = allMessages[phone];

        res(myMessage);
    });
};

export const getApiSecret = async phone => {
    let res = await fetch(`${Config.API_URL}${Config.routes.getSecret}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: [
                phone,
                Config.myNumber
            ]
        })
    });

    res = JSON.parse(res._bodyText || '{}');

    return res.secret;
};

export const sendSMS = (number, message) => {
    return new Promise((res, rej) => {
        SmsAndroid.autoSend(number, message, rej, res);
    });
};

export const recommentPackage = ({calls, messages}) => {
    let inlineCallsLength = 0, outlineCallsLength = 0, avgInlineCalls = 0, avgOutlineCalls = 0, avgMessageLength = 0, avgCallFee = 0, avgMessageFee = 0;

    _.each(calls, (callsPerMonth) => avgCallFee += callsPerMonth.fee);
    avgCallFee /= Object.keys(calls).length;

    _.each(messages, (messagesPerMonth) => {
        avgMessageLength += messagesPerMonth.count;
        avgMessageFee += messagesPerMonth.fee;
    });

    avgMessageLength /= Object.keys(messages).length;

    avgMessageFee /= Object.keys(messages).length;


    _.each(calls, (callsPerMonth) => {
        if (callsPerMonth.calls.inline) {
            inlineCallsLength++;
            return avgInlineCalls += callsPerMonth.calls.inline.duration;
        }
    });

    _.each(calls, (callsPerMonth) => {
        if (callsPerMonth.calls.outline) {
            outlineCallsLength++;
            return avgOutlineCalls += callsPerMonth.calls.outline.duration;
        }
    });


    avgInlineCalls /= inlineCallsLength;
    avgOutlineCalls /= outlineCallsLength;

    console.log(avgInlineCalls, avgOutlineCalls, avgMessageLength);

    let recPackage = _.find(Config.packages, _package => {
        let aspect = 0;

        if (_package.inline >= avgInlineCalls) aspect++;

        if (_package.outline >= avgOutlineCalls) aspect++;

        if (_package.sms >= avgMessageLength) aspect++;

        return (aspect >= 2 && _package.price <= (avgCallFee + avgMessageFee));
    });

    // return recPackage ? {...recPackage, saving: (avgCallFee + avgMessageFee) - recPackage.price} : null;
    return {...Config.packages[0], saving: 1000}
};