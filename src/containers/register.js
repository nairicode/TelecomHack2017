import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux'
import ActionCreators from '../actions';
import Styles from '../styles';

import Logo from '../img/Logo.png';

class Register extends Component {

    constructor (props) {
        super(props);

        this.state = {
            number: ""
        }
    }

    onChangeText (val) {
       if(typeof val === 'number') {
           return this.setState({number: val});
       }
       return false;
    }

    onPress () {
        Actions.confirm();
    }

    render() {

        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <Image source={Logo} resizeMode="contain" style={Styles.logoImg}/>
                <Makiko
                    label={'Phone'}
                    iconClass={FontAwesomeIcon}
                    iconName={'phone'}
                    iconColor={'white'}
                    style={Styles.inputWrapper}
                    keyboardType = 'numeric'
                    inputStyle={Styles.registerInput}
                    value={this.state.number}
                    onChangeText={this.onChangeText.bind(this)}
                />
                <TouchableHighlight style={Styles.submitBtn} onPress={this.onPress.bind(this)}>
                    <View style={[Styles.flex, Styles.flexCenter]}>
                        <Text style={Styles.defaultText}>Login</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
