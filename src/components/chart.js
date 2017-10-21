import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Styles from '../styles';

export default class Chart extends Component {

    componentDidMount () {
        // console.log(this.props)
    }

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter, {alignSelf: 'flex-end'}]}>
                <View style={[Styles.chart, {flex: this.props.maxValue / this.props.value}]}/>
                <Text>{this.props.y}</Text>
                <Text>{this.props.x}</Text>
            </View>
        );
    }
}