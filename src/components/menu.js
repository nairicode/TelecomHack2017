import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import MenuItem from './menuItem'
import Styles from '../styles';

export default class Header extends Component {
    render() {
        return (
            <ScrollView scrollsToTop={false} style={Styles.menu} >
                <MenuItem name="messages" iconName="envelope" displayName="Հաղորդագրություններ" onPress={this.props.onPress}/>
                <MenuItem name="expenses" iconName="money" displayName="Ծախսեր" onPress={this.props.onPress}/>
            </ScrollView>
        );
    }
}