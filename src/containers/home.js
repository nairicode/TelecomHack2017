import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import ActionCreators from '../actions';
import Styles from '../styles';

import Messages from './messages';

class Home extends Component {

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter]}>

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
