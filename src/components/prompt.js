import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Styles from '../styles';

export default class Prompt extends Component {

    constructor (props) {
        super(props);

        this.state = {
            text: ""
        }
    }

    changeText(text) {
        this.setState({text});
    }

    render() {
        if (!this.props.visible) return null;

        return (
            <View style={[Styles.promptWrapper]}>
                <View style={[Styles.prompt]}>
                    <View style={[Styles.flex, Styles.spaceAround]}>
                        <Text style={[Styles.defaultText, {color: '#000'}]}>{this.props.title}</Text>
                        <TextInput
                            value={this.state.text}
                            onChangeText={this.changeText.bind(this)}
                            keyboardType = 'numeric'
                        />
                        <View style={[Styles.flex, Styles.flexRow, Styles.spaceAround]}>
                            <TouchableOpacity onPress={() => this.props.onClose()}>
                                    <Text>Չեղարկել</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.onSubmit(this.state.text)}>
                                    <Text>Լավ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}