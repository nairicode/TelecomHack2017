import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';

import ActionCreators from '../actions';
import Styles from '../styles';
import Message from '../components/message';

class Messages extends Component {

    componentDidMount () {

    }

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <FlatList
                    data={this.props.messages}
                    renderItem={({item}) => <Message {...item} />}
                    keyExtractor={(item, index) => index}
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
