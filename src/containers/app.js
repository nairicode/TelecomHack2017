import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

import Home from './home';
import Register from './register';
import Confirm from './confirm';

export const store = createStore(reducer, applyMiddleware(thunk));


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Router>
                <Scene key="root">
                  <Scene key="home" component={Home} hideNavBar hideTabBar/>
                  <Scene key="register" component={Register} initial hideNavBar hideTabBar/>
                  <Scene key="confirm" component={Confirm} hideNavBar hideTabBar />
                </Scene>
              </Router>
            </Provider>
        );
    }
}