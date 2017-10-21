import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'underscore';

import * as Utils from '../helpers/utils';
import ActionCreators from '../actions';
import Styles from '../styles';

import Charts from '../components/charts';
import Notification from '../components/notification';


class ChartsPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            _package: null
        }
    }

    componentDidMount () {
        let _package = Utils.recommentPackage(this.props);

        console.log(_package);

        if(!_.isEmpty(_package)) {
            this.setState({_package});
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[Styles.flex, Styles.flexCenter, Styles.fullWidth]}>
                <Notification package={this.state._package} ref="notification"/>
                <Text style={Styles.textBold}>Զանգեր / Դ. </Text>
                <Charts data={this.props.calls}/>
                <Text style={Styles.textBold}>Հաղորդագրություններ / Դ.</Text>
                <Charts data={this.props.messages}/>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {
        messages: state.chartMessages,
        calls: state.chartCalls
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsPage);
