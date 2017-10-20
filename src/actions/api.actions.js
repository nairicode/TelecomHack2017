import * as types from './types';
import Config from '../config';
import _ from 'underscore';
import { Actions } from 'react-native-router-flux';

export const register = number => {
    return async dispatch => {
        let res = await fetch(`${Config.API_URL}${Config.routes.register}`, {
            method: 'POST',
            body: {
                number
            }
        });
    }
};

export const verifyCode = code => {
    return async dispatch => {
        let res = await fetch(`${Config.API_URL}${Config.routes.register}`, {
            method: 'POST',
            body: {
                number
            }
        });

        let { status } = res.json();

        if (status) Actions.home();
        else alert('Invalid code');

    }
};