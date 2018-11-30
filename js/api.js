import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { errorMessages } from './constants'

const axios = require('axios');

const api_url = 'https://api.turnie.re';


const actiontypes_userinfo = {
    'REGISTER'                  : 'REGISTER',
    'REGISTER_RESULT_SUCCESS'   : 'REGISTER_RESULT_SUCCESS',
    'REGISTER_RESULT_ERROR'     : 'REGISTER_RESULT_ERROR',

    'LOGIN'                     : 'LOGIN',
    'LOGIN_RESULT_SUCCESS'      : 'LOGIN_RESULT_SUCCESS',
    'LOGIN_RESULT_ERROR'        : 'LOGIN_RESULT_ERROR',

    'REHYDRATE'                 : 'USERINFO_REHYDRATE',
}

const defaultstate_userinfo = {
    isSignedIn : false,
    username : null,
    error : false,
    errorMessages : [],

    accesstoken : null,
    client : null,
    expiry : null,
    uid : null
}

const reducer_userinfo = (state = defaultstate_userinfo, action) => {
    switch(action.type) {
        case actiontypes_userinfo.REGISTER:
            axios.post(api_url + '/users', {
                'username' : action.parameters.username,
                'email' : action.parameters.email,
                'password' : action.parameters.password
            }).then((resp) => {
                __store.dispatch({
                    type : actiontypes_userinfo.REGISTER_RESULT_SUCCESS
                })
            }).catch((error) => {
                if (error.response) {
                    __store.dispatch({
                        'type' : actiontypes_userinfo.REGISTER_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : error.response.data.errors.full_messages
                        }
                    })
                } else {
                    __store.dispatch({
                        'type' : actiontypes_userinfo.REGISTER_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : [
                                errorMessages['registration_errorunknown']['en']
                            ]
                        }
                    })
                }
            });
            return Object.assign({}, state, {});
        case actiontypes_userinfo.REGISTER_RESULT_SUCCESS:
            return Object.assign({}, state, {
                error : false,
                errorMessages : []
            });
        case actiontypes_userinfo.REGISTER_RESULT_ERROR:
            return Object.assign({}, state, {
                error : true,
                errorMessages : action.parameters.errorMessages
            });
        case actiontypes_userinfo.LOGIN:
            axios.post(api_url + '/users/sign_in', {
                email : action.parameters.email,
                password : action.parameters.password
            }).then((resp) => {
                console.log(resp);
                __store.dispatch({
                    type : actiontypes_userinfo.LOGIN_RESULT_SUCCESS,
                    parameters : {
                        username : resp.data.data.username,
                        accesstoken : resp.headers['access-token'],
                        client : resp.headers['client'],
                        expiry : resp.headers['expiry'],
                        uid : resp.headers['uid']
                    }
                });
            }).catch((error) => {
                if(error.response) {
                    console.log(error.response);
                    __store.dispatch({
                        'type' : actiontypes_userinfo.LOGIN_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : error.response.data.errors
                        }
                    })
                } else {
                    console.log(error);
                    console.log(errorMessages['login_errorunknown']['en']);
                    __store.dispatch({
                        'type' : actiontypes_userinfo.LOGIN_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : [ errorMessages['login_errorunknown']['en'] ]
                        }
                    });
                }
            });
            return Object.assign({}, state, {});
        case actiontypes_userinfo.LOGIN_RESULT_SUCCESS:
            return Object.assign({}, state, {
                isSignedIn : true,
                error : false,
                errorMessages : [],

                username : action.parameters.username,

                accesstoken : action.parameters.accesstoken,
                client : action.parameters.client,
                expiry : action.parameters.expiry,
                uid : action.parameters.uid
            });
        case actiontypes_userinfo.LOGIN_RESULT_ERROR:
            return Object.assign({}, state, {
                error : true,
                errorMessages : action.parameters.errorMessages
            });
        case actiontypes_userinfo.REHYDRATE:
            return Object.assign({}, state, action.parameters);
        default: return state;
    }
}

const reducers = {
    userinfo: reducer_userinfo
}

const default_applicationstate = {
    userinfo : defaultstate_userinfo
}

var __store;

export function initializeStore(initialState = default_applicationstate) {
    __store = createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    __store.subscribe(() => {
        localStorage.setItem('reduxState', JSON.stringify(__store.getState()))
    });
    return __store;
}

export function verifyCredentials() {
    rehydrateApplicationState();
}

export function register(username, email, password) {
    __store.dispatch({
        type: actiontypes_userinfo.REGISTER,
        parameters: {
            username: username,
            email: email,
            password: password
        }
    });
}

export function login(email, password) {
    __store.dispatch({
        type: actiontypes_userinfo.LOGIN,
        parameters: {
            email: email,
            password: password
        }
    })
}

export function getState() {
    return __store.getState();
}

function rehydrateApplicationState() {
    const persistedState = localStorage.getItem('reduxState') ?
        JSON.parse(localStorage.getItem('reduxState')) :
        undefined;

    if(persistedState) {
        __store.dispatch({
            type : actiontypes_userinfo.REHYDRATE,
            parameters : Object.assign({}, persistedState.userinfo, {})
        });
    }
}




