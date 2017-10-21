import _ from 'underscore';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import CallLogs from 'react-native-call-log'
import SmsAndroid  from 'react-native-get-sms-android';
import Contacts from 'react-native-contacts';

import * as types from './types';
import * as Utils from '../helpers/utils';
import Config from '../config';

export const register = number => {
    return async dispatch => {
        let res = await fetch(`${Config.API_URL}${Config.routes.register}`, {
            method: 'POST',
            body: {
                number
            }
        });
    }
};

export const verifyCode = code => {
    return async dispatch => {
        let res = await fetch(`${Config.API_URL}${Config.routes.register}`, {
            method: 'POST',
            body: {
                number
            }
        });

        let { status } = res.json();

        if (status) Actions.home();
        else alert('Invalid code');

    }
};

export const getPhoneNumber = () => {
    let number = "099999999";

    try { number = DeviceInfo.getPhoneNumber() } catch (err) {}

    return {
        type: types.setNumber,
        number
    }
};

export const setChartMessages = messages => {
    return {
        type: types.setChartMessages,
        messages
    }
};

export const setChartCalls = calls => {
    return {
        type: types.setChartCalls,
        calls
    }
};

export const getCalls = () => {
    return async dispatch => {
        CallLogs.show((logs) =>{
            // parse logs into json format
            const calls = Utils.filterCalls(JSON.parse(logs));

            dispatch(setChartCalls(calls));

        });
    }
};


export const getAllContactsFromMessage = () => {

    return async dispatch => {
        let contacts = await Utils.getAllContacts();
        let messages = await Utils.getAllMessages();

        let contactsWithName = _.map(messages, (msg, key, i) => {
            return {
                phone: key,
                name: contacts[key]
            }
        });

        dispatch(setContacts(contactsWithName));
    };
};


export const getAllMessages = () => {
    let filter = {
        box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // the next 4 filters should NOT be used together, they are OR-ed so pick one
        read: 1, // 0 for unread SMS, 1 for SMS already read
    };

    return async dispatch => {
        SmsAndroid.list(JSON.stringify(filter), (fail) => null,
            (count, smsList) => {
                let arr = JSON.parse(smsList);

                let messages = _.groupBy(arr.filter(el => !_.isNaN(parseInt(el.address))), 'address');
                // dispatch(setChartMessages(messages));
            });
    };
};


export const getSentMessages = () => {
    let filter = {
        box: 'sent', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // the next 4 filters should NOT be used together, they are OR-ed so pick one
        read: 1, // 0 for unread SMS, 1 for SMS already read
    };

    return async dispatch => {
        SmsAndroid.list(JSON.stringify(filter), (fail) => null,
            (count, smsList) => {
                let arr = JSON.parse(smsList);
                let messages = Utils.filterMessages(_.map(arr, message => ({to: message.address, callDate: message.date})));

                dispatch(setChartMessages(messages));
            });
    }
};

export const getReceivedMessages = () => {
    let filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        // the next 4 filters should NOT be used together, they are OR-ed so pick one
        read: 1, // 0 for unread SMS, 1 for SMS already read
    };

    return async dispatch => {
        SmsAndroid.list(JSON.stringify(filter), (fail) => {
                console.log("Failed with this error: " + fail)
            },
            (count, smsList) => {
                let arr = JSON.parse(smsList);
            });
    }
};

export const setNewKey = (num1, num2) => {
    return async dispatch => {
        let key = Utils.generateRandomKey();
        fetch(`${Config.API_URL}${Config.routes.register}`, {
            method: 'POST',
            body: {
                num1,
                num2,
                key
            }
        });

        Utils.setKey((parseInt(num1) + parseInt(num2)).toString(), key);
    }
};

export const setContacts = (contacts) => {
    return {
        type: types.setContacts,
        contacts
    }
};