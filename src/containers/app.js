import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

import Home from './home';
import Register from './register';
import Confirm from './confirm';
import Chat from './chat';
import Package from '../components/package';

export const store = createStore(reducer, applyMiddleware(thunk));


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Router>
                <Scene key="root">
                  <Scene key="home" component={Home} initial hideNavBar hideTabBar/>
                  <Scene key="register" component={Register} hideNavBar hideTabBar/>
                  <Scene key="confirm" component={Confirm} hideNavBar hideTabBar />
                  <Scene key="chat" component={Chat} hideNavBar hideTabBar />
                  <Scene key="plan" component={Package} hideNavBar hideTabBar direction="vertical" />
                </Scene>
              </Router>
            </Provider>
        );
    }
}