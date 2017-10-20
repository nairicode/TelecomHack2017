import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';

import ActionCreators from '../actions';
import Styles from '../styles';

import BeelineLogo from '../img/BeeLine_logo.png';

class Confirm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            number: ""
        }
    }

    onChangeText(val) {
       if(val.length === 4) {
           return this.checkCode(val);
       }
    }

    checkCode (code) {
        this.props.checkCode(code);
    }

    componentDidMount () {

    }

    render() {

        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <Image source={BeelineLogo} resizeMode="contain" style={Styles.logoImg}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
