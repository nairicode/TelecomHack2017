import React, { Component } from 'react';
import { View, Text } from 'react-native';
import _ from 'underscore';

import Styles from '../styles';
import Config from '../config';
import Chart from './chart';

export default class Charts extends Component {

    constructor (props) {
        super(props);
    }

    getMaxValue (data) {
        let max = _.max(_.map(data, 'fee'));

        return max === -Infinity? 0 : max;
    }

    componentDidMount () {

    }

    render() {
        // if(_.isEmpty(this.props.data)) return null;

        let maxValue = this.getMaxValue(this.props.data);
        return (
            <View style={[Styles.flex, Styles.flexCenter, Styles.flexRow]}>
                {_.map(_.range(12), month => {
                    return <Chart
                        maxValue={maxValue}
                        value={this.props.data[month]?this.props.data[month].fee : 0}
                        y={this.props.data[month]?`${this.props.data[month].fee}` : '0'}
                        x={Config.months[month]}
                        key={month}
                    />
                })}
            </View>
        );
    }
}