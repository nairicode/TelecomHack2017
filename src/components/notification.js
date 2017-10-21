import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Animated } from 'react-native';
import _ from 'underscore';

import Styles from '../styles';
import { Actions } from 'react-native-router-flux';

export default class Notification extends Component {

    constructor (props) {
        super(props);

        this.state = {
            top: new Animated.Value(-40)
        }
    }

    componentWillReceiveProps (props) {
        if(props.package) {
            this.show();
        }
    }

    show () {
        Animated.spring(this.state.top, {
            toValue: 0
        }).start();
    }

    hide () {
        Animated.spring(this.state.top, {
            toValue: -40
        }).start();
    }

    componentDidMount () {
        // console.log(this.props)
    }

    render() {
        if(_.isEmpty(this.props.package)) return null;

        return (
            <Animated.View style={[Styles.notification, {top: this.state.top}]}>
                <TouchableOpacity onPress={() => {
                    this.hide();
                    Actions.plan(this.props.package);
                }}>
                    <Text style={Styles.packageInfoName}>Նոր փաթեթի առաջարկ, խնայողություն՝ {this.props.package.saving}դ.</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}