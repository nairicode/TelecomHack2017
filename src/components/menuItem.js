import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Styles from '../styles';

export default class Header extends Component {
    render() {
        return (
            <TouchableOpacity style={[Styles.flex, Styles.flexRow, Styles.flexCenter, Styles.flexStart, Styles.menuItem]} onPress={() => this.props.onPress(this.props.name)}>
                <FontAwesome size={16} name={this.props.iconName}/>
                <Text style={[Styles.defaultText, {color: '#fff', fontSize: 12}]}>{this.props.displayName}</Text>
            </TouchableOpacity>
        );
    }
}