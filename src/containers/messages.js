import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Actions } from 'react-native-router-flux';


import ActionCreators from '../actions';
import Styles from '../styles';
import Message from '../components/message';
import Header from '../components/header';
import Prompt from '../components/prompt';


class Messages extends Component {

    constructor (props) {
        super(props);

        this.state = {
            promptVisible: false
        }
    }

    componentDidMount () {
        this.props.getAllContactsFromMessage();
    }

    openModal () {
        this.setState({promptVisible: true});
    }

    submitPrompt (val) {
        this.setState({promptVisible: false});
        Actions.chat({phone: val});
    }

    cancelPrompt() {
        this.setState({
            promptVisible: false,
        });
    }

    render() {
        return (
            <View style={[Styles.flex, Styles.flexCenter]}>
                <View style={Styles.header} >
                    <Header number={this.props.number} onPress={this.openModal.bind(this)}/>
                </View>
                <ScrollView>
                    {_.map(this.props.contacts, (contact, index) => <Message key={index} {...contact} />)}
                </ScrollView>

                <Prompt
                    title="Նոր հաղորդագրություն"
                    visible={ this.state.promptVisible }
                    onClose={this.cancelPrompt.bind(this)}
                    onSubmit={this.submitPrompt.bind(this)}/>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
