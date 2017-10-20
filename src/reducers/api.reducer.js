import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';
import _ from 'underscore';

export const messages = createReducer([], {
    [types.setMessages] (state, action) {
        return action.messages;
    }
}) ;