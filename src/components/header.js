import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Styles from '../styles';

export default class Header extends Component {

    componentDidMount () {

    }

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter, Styles.flexRow, {paddingHorizontal: 5}]}>
                <View style={[Styles.flex, Styles.flexRow, Styles.flexCenter, Styles.spaceBetween]}>
                    <FontAwesome name="phone" size={30}/>
                    <Text style={[Styles.defaultText, {color: '#333', marginLeft: 10}]}> {this.props.number}</Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <FontAwesome name="plus" size={30}/>
                </TouchableOpacity>
            </View>
        );
    }
}