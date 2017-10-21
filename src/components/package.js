import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import Styles from '../styles';

export default class Package extends Component {

    componentDidMount () {
        // console.log(this.props)
    }

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <Text style={Styles.packageInfoName}>{this.props.packageName}</Text>
                <Text style={Styles.packageInfoText}>Հաղորդագրություններ / {this.props.sms}</Text>
                <Text style={Styles.packageInfoText}>Զանգեր ցանցի ներսում/ր. {this.props.inline}</Text>
                <Text style={Styles.packageInfoText}>Զանգեր ցանցից դուռս/ր. {this.props.outline}</Text>
                <Text style={Styles.packageInfoText}>Ամսավճար {this.props.price}</Text>
                <Text style={Styles.savingText}>Խնայողություն {this.props.saving}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(this.props.url)}><Text>Ավելին</Text></TouchableOpacity>
            </View>
        );
    }
}