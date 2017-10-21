import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';

import ActionCreators from '../actions';
import Styles from '../styles';

import Messages from './messages';
import ChartsPage from './chartsPage';
import Menu from '../components/menu';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'messages'
        }
    }

    onMenuPress (page) {
        this.setState({page, isOpen: false});
    }

    componentWillMount () {
        this.props.getPhoneNumber();
        this.props.getSentMessages();
        this.props.getCalls();
    }

    render() {
        Keyboard.dismiss();

        let { page } = this.state;

        return (
            <SideMenu
                menu={<Menu onPress={this.onMenuPress.bind(this)}/>}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.setState({isOpen})}
            >
                <View style={Styles.container}>
                    { page === 'expenses' && <ChartsPage/> }
                    { page === 'messages' && <Messages/> }
                </View>
            </SideMenu>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

const mapStateToProps = (state) => {
    return {
        number: state.number
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
