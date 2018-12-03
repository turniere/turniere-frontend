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

    'LOGOUT'                    : 'LOGOUT',
    'APPLY_SIGN_OUT'            : 'APPLY_SIGN_OUT',

    'STORE_AUTH_HEADERS'        : 'STORE_AUTH_HEADERS',

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

export function postRequest(state, url, data) {
    return axios.post(api_url + url, data, {
        headers : generateHeaders(state)
    });
}

export function getRequest(state, url) {
    return axios.get(api_url + url, {
        headers : generateHeaders(state)
    });
}

export function deleteRequest(state, url) {
    return axios.delete(api_url + url, {
        headers : generateHeaders(state)
    });
}

function generateHeaders(state) {
    if(state.isSignedIn) {
        return {
            'access-token' : state.accesstoken,
            'client' : state.client,
            'uid' : state.uid
        };
    } else {
        return {};
    }
}

function storeOptionalToken(response) {
    if(checkForAuthenticationHeaders(response)) {
        __store.dispatch({
            type : actiontypes_userinfo.STORE_AUTH_HEADERS,
            parameters : {
                accesstoken : response.headers['access-token'],
                client : response.headers['client'],
                expiry : response.headers['expiry'],
                uid : response.headers['uid']
            }
        })
    }
}

function checkForAuthenticationHeaders(response) {
    if(response.headers) {
        const requiredHeaders = [
            'access-token', 'client', 'uid', 'expiry'
        ];
        for(var i = 0; i < requiredHeaders.length; i++) {
            if(!response.headers[requiredHeaders[i]]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const reducer_userinfo = (state = defaultstate_userinfo, action) => {
    switch(action.type) {
        case actiontypes_userinfo.REGISTER:
            postRequest(state, '/users', {
                'username' : action.parameters.username,
                'email' : action.parameters.email,
                'password' : action.parameters.password
            }).then((resp) => {
                __store.dispatch({
                    type : actiontypes_userinfo.REGISTER_RESULT_SUCCESS
                });
                storeOptionalToken(resp);
            }).catch((error) => {
                if (error.response) {
                    __store.dispatch({
                        'type' : actiontypes_userinfo.REGISTER_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : error.response.data.errors.full_messages
                        }
                    });
                    storeOptionalToken(error.response);
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
            postRequest(state, '/users/sign_in', {
                email : action.parameters.email,
                password : action.parameters.password
            }).then((resp) => {
                __store.dispatch({
                    type : actiontypes_userinfo.LOGIN_RESULT_SUCCESS,
                    parameters : {
                        username : resp.data.data.username,
                    }
                });
                storeOptionalToken(resp);
            }).catch((error) => {
                if(error.response) {
                    __store.dispatch({
                        'type' : actiontypes_userinfo.LOGIN_RESULT_ERROR,
                        'parameters' : {
                            'errorMessages' : error.response.data.errors
                        }
                    });
                    storeOptionalToken(error.response);
                } else {
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
            });
        case actiontypes_userinfo.LOGIN_RESULT_ERROR:
            return Object.assign({}, state, {
                error : true,
                errorMessages : action.parameters.errorMessages
            });
        
        case actiontypes_userinfo.LOGOUT:
            deleteRequest(state, '/users/sign_out').then((resp) => {
                __store.dispatch({ type : actiontypes_userinfo.APPLY_SIGN_OUT });
            }).catch((error) => {
                __store.dispatch({ type : actiontypes_userinfo.APPLY_SIGN_OUT });
            });
            return Object.assign({}, state, {});
        case actiontypes_userinfo.APPLY_SIGN_OUT:
            return Object.assign({}, state, {
                isSignedIn : false,
                username : null,
                error : false,
                errorMessages : [],

                accesstoken : null,
                client : null,
                expiry : null,
                uid : null
            });
        case actiontypes_userinfo.STORE_AUTH_HEADERS:
            return Object.assign({}, state, {
                accesstoken : action.parameters.accesstoken,
                client : action.parameters.client,
                expiry : action.parameters.expiry,
                uid : action.parameters.uid
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

    // TODO: Actually perform a verification of the loaded credentials
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

export function logout() {
    __store.dispatch({ type : actiontypes_userinfo.LOGOUT });
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




