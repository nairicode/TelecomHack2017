import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Styles from '../styles';

export default class Message extends Component {
    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <TouchableOpacity onPress={() => {
                    Actions.chat({
                        phone: this.props.phone,
                        contactName: this.props.name
                    });
                }}>
                    <View style={Styles.contactView}>
                        <Text style={Styles.contactName}>{this.props.name}</Text>
                        <Text style={Styles.contactPhone}>{this.props.phone}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}