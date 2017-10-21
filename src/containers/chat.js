import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import _ from 'underscore';

import * as Utils from '../helpers/utils';
import ActionCreators from '../actions';
import Config from '../config';
import Styles from '../styles';
import Prompt from '../components/prompt';
import RadioForm from 'react-native-simple-radio-button';


let radio_props = [
    {label: 'API ', value: '|tlc#1' },
    {label: 'Custom ', value: '|tlc#2' },
    {label: 'Client ', value: '|tlc#3' }
];

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.key = '|tlc#1';
    }

    componentWillMount() {
        this.renderMessages();

        this.interval = setInterval(this.renderMessages.bind(this), 3000);
    }

    componentWillUnmount () {
         clearInterval(this.interval);
    }

    async renderMessages() {
        let messages = await Utils.getAllMessagesByPhone(this.props.phone);
        this.apiSecret = await Utils.getApiSecret(this.props.phone);

        if(!messages) return;

        let newMessage = [];

        messages.sort((a, b) => {
            return a.date - b.date;
        });

        _.each(messages, (message, index) => {
            let msg = message.body.slice(0, -6),
                hashType = message.body.slice(-6);

            if (hashType === '|tlc#1') { // API
                hashType = 'API_Secret';
                msg = Utils.dencryptMessage(msg, this.apiSecret);
            } else if (hashType === '|tlc#2') { // HandSecret
                hashType = 'CustomSecret';
                msg = Utils.dencryptMessage(msg, Config.handSecret);
            } else if (hashType === '|tlc#3') { // ClientHash
                hashType = 'ClientHash';
                msg = Utils.dencryptMessage(msg, Config.clientSecret);
            } else { // NoHash
                hashType = 'NoHash';
            }

            msg = `(${hashType}), ${msg}`;

            newMessage.push({
                _id: index,
                text: msg,
                createdAt: message.date,
                user: {
                    _id: message.type == 1 ? 2 : 1
                }
            });
        });

        this.setState({
            messages: newMessage.reverse()
        });
    }

    activePrompt() {
        this.setState({
            promptVisible: true
        });
    }

    submitPrompt(secret) {
        Config.handSecret = secret || Config.handSecret;

        this.setState({
            promptVisible: false
        });
    }

    cancelPrompt() {
        this.setState({
            promptVisible: false
        });
    }

    render() {

        return (
            <View style={Styles.flex}>
                <View style={[{flex: 0.2}, Styles.flexCenter]}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {
                            this.key = value;

                            if (value === '|tlc#2') {
                                this.activePrompt();
                            }
                        }}
                    />
                </View>
                <View style={Styles.flex}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(messages) => {
                            let msg = messages[0].text;

                            let secret = null;

                            if (this.key === '|tlc#1') { // API
                                secret = this.apiSecret;
                            } else if (this.key === '|tlc#2') { // HandSecret
                                secret = Config.handSecret;
                            } else if (this.key === '|tlc#3') { // ClientHash
                                secret = Config.clientSecret;
                            }

                            let textEn = Utils.encryptMessage(msg, secret);

                            textEn += this.key;

                            Utils.sendSMS(this.props.phone, textEn)
                                .then(this.renderMessages.bind(this))
                            // uxarkel
                        }}
                        user={{
                            _id: 1,
                        }}
                    />
                </View>
                <Prompt
                    title="Գաղտնագիր"
                    visible={ this.state.promptVisible }
                    onClose={this.cancelPrompt.bind(this)}
                    onSubmit={this.submitPrompt.bind(this)}/>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {
        number: state.number
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
