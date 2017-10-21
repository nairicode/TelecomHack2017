import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';
import _ from 'underscore';

export const messages = createReducer([], {
    [types.setMessages] (state, action) {
        return action.messages;
    }
});

export const number = createReducer("", {
    [types.setNumber] (state, action) {
        return action.number;
    }
});

export const chartMessages = createReducer({key: Math.random()}, {
    [types.setChartMessages] (state, action) {
        return action.messages;
    }
});

export const chartCalls = createReducer({key: Math.random()}, {
    [types.setChartCalls] (state, action) {
        return action.calls;
    }
});

export const contacts = createReducer([], {
   [types.setContacts] (state, action) {
       return action.contacts;
   }
});