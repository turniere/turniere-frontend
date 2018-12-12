import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { errorMessages } from './constants';

const axios = require('axios');

const api_url = 'https://api.turnie.re';

const actiontypes_userinfo = {
    'REGISTER'                     : 'REGISTER',
    'REGISTER_RESULT_SUCCESS'      : 'REGISTER_RESULT_SUCCESS',
    'REGISTER_RESULT_ERROR'        : 'REGISTER_RESULT_ERROR',

    'LOGIN'                        : 'LOGIN',
    'LOGIN_RESULT_SUCCESS'         : 'LOGIN_RESULT_SUCCESS',
    'LOGIN_RESULT_ERROR'           : 'LOGIN_RESULT_ERROR',
 
    'LOGOUT'                       : 'LOGOUT',

    'VERIFY_CREDENTIALS'           : 'VERIFY_CREDENTIALS',
    'VERIFY_CREDENTIALS_SUCCESS'   : 'VERIFY_CREDENTIALS_SUCCESS',
    'VERIFY_CREDENTIALS_ERROR'     : 'VERIFY_CREDENTIALS_ERROR',

    'STORE_AUTH_HEADERS'           : 'STORE_AUTH_HEADERS',

    'REHYDRATE'                    : 'USERINFO_REHYDRATE',
    'CLEAR'                        : 'USERINFO_CLEAR',
};

const defaultstate_userinfo = {
    isSignedIn : false,
    username : null,
    error : false,
    errorMessages : [],

    accesstoken : null,
    client : null,
    expiry : null,
    uid : null
};

const actiontypes_tournamentinfo = {
    'REQUEST_TOURNAMENT'           : 'REQUEST_TOURNAMENT',
    'REQUEST_TOURNAMENT_SUCCESS'   : 'REQUEST_TOURNAMENT_SUCCESS',

    'MODIFY_TOURNAMENT'            : 'MODIFY_TOURNAMENT',
    'MODIFY_TOURNAMENT_SUCCESS'    : 'MODIFY_TOURNAMENT_SUCCESS',
    'MODIFY_TOURNAMENT_ERROR'      : 'MODIFY_TOURNAMENT_ERROR',

    'REHYDRATE'                    : 'TOURNAMENTINFO_REHYDRATE',
    'CLEAR'                        : 'TOURNAMENTINFO_CLEAR',
};

const defaultstate_tournamentinfo = {
    code : '',
    description : '',
    id : -1,
    name : '',
    isPublic : '',
    stages: [],
    teams : []
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

export function patchRequest(state, url, data) {
    return axios.patch(api_url + url, data, {
        headers : generateHeaders(state)
    });
}

function generateHeaders(state) {
    if(state.userinfo.isSignedIn) {
        return {
            'access-token' : state.userinfo.accesstoken,
            'client' : state.userinfo.client,
            'uid' : state.userinfo.uid
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
        });
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
        postRequest(action.state, '/users', {
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
                });
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
        postRequest(action.state, '/users/sign_in', {
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
        deleteRequest(action.state, '/users/sign_out').then(() => {
            __store.dispatch({ type : actiontypes_userinfo.CLEAR });
        }).catch(() => {
            __store.dispatch({ type : actiontypes_userinfo.CLEAR });
        });
        return Object.assign({}, state, {});
    case actiontypes_userinfo.STORE_AUTH_HEADERS:
        return Object.assign({}, state, {
            accesstoken : action.parameters.accesstoken,
            client : action.parameters.client,
            expiry : action.parameters.expiry,
            uid : action.parameters.uid
        });
    case actiontypes_userinfo.VERIFY_CREDENTIALS:
        getRequest(action.state, '/users/validate_token').then((resp) => {
            storeOptionalToken(resp);
        }).catch(() => {
            __store.dispatch({ type: actiontypes_userinfo.CLEAR });
        });
        return Object.assign({}, state, {});
    case actiontypes_userinfo.REHYDRATE:
        return Object.assign({}, state, action.parameters);
    case actiontypes_userinfo.CLEAR:
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
    default: return state;
    }
};

const reducer_tournamentinfo = (state = defaultstate_tournamentinfo, action) => {
    switch(action.type) {
    case actiontypes_tournamentinfo.REQUEST_TOURNAMENT:
        getRequest(action.state, '/tournaments/' + action.parameters.code).then((resp) => {
            __store.dispatch({
                type: actiontypes_tournamentinfo.REQUEST_TOURNAMENT_SUCCESS,
                parameters: resp.data
            });
            storeOptionalToken(resp);
            action.parameters.successCallback();
        }).catch((error) => {
            action.parameters.errorCallback();
        });
        return Object.assign({}, state, {});
    case actiontypes_tournamentinfo.REQUEST_TOURNAMENT_SUCCESS:
        return Object.assign({}, state, {
            code : action.parameters.code,
            description : action.parameters.description,
            id : action.parameters.id,
            name : action.parameters.name,
            isPublic : action.parameters.public,
            stages: action.parameters.stages,
            teams : action.parameters.teams
        });
    case actiontypes_tournamentinfo.MODIFY_TOURNAMENT:
        patchRequest(action.state, '/teams/' + action.parameters.teamid, {
            name: action.parameters.name
        }).then((resp) => {
            storeOptionalToken(resp);
            action.parameters.onSuccess();
        }).catch((error) => {
            if(error.response) {
                storeOptionalToken(error.response);
            }
            action.parameters.onError();
        });
        return Object.assign({}, state, {});
    case actiontypes_tournamentinfo.MODIFY_TOURNAMENT_SUCCESS:

        return Object.assign({}, state, {});
    case actiontypes_tournamentinfo.MODIFY_TOURNAMENT_ERROR:

        return Object.assign({}, state, {});
        
    case actiontypes_tournamentinfo.REHYDRATE:

        return Object.assign({}, state, {});
    case actiontypes_tournamentinfo.CLEAR:

        return Object.assign({}, state, {});
    default: return state;
    }
}

const reducers = {
    userinfo: reducer_userinfo,
    tournamentinfo: reducer_tournamentinfo
};

const default_applicationstate = {
    userinfo : defaultstate_userinfo,
    tournamentinfo: defaultstate_tournamentinfo
};

var __store;

export function initializeStore(initialState = default_applicationstate) {
    __store = createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    __store.subscribe(() => {
        localStorage.setItem('reduxState', JSON.stringify(__store.getState()));
    });
    return __store;
}

export function verifyCredentials() {
    rehydrateApplicationState();

    if(__store.getState().userinfo.isSignedIn) {
        __store.dispatch({
            type: actiontypes_userinfo.VERIFY_CREDENTIALS,
            state: __store.getState()
        });
    }
}

export function register(username, email, password) {
    __store.dispatch({
        type: actiontypes_userinfo.REGISTER,
        parameters: {
            username: username,
            email: email,
            password: password
        },
        state: __store.getState()
    });
}

export function login(email, password) {
    __store.dispatch({
        type: actiontypes_userinfo.LOGIN,
        parameters: {
            email: email,
            password: password
        },
        state: __store.getState()
    });
}

export function logout() {
    __store.dispatch({
        type : actiontypes_userinfo.LOGOUT,
        state: __store.getState()
    });
}

export function requestTournament(code, successCallback, errorCallback) {
    __store.dispatch({
        type: actiontypes_tournamentinfo.REQUEST_TOURNAMENT,
        parameters: {
            code: code,
            successCallback: successCallback,
            errorCallback: errorCallback
        },
        state: __store.getState()
    });
}

export function updateTeamName(team, successCB, errorCB) {
    __store.dispatch({
        type: actiontypes_tournamentinfo.MODIFY_TOURNAMENT,
        parameters: {
            teamid: team.id,
            name: team.name,
            onSuccess : successCB,
            onError : errorCB
        },
        state: __store.getState()
    });
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
        __store.dispatch({
            type : actiontypes_tournamentinfo.REHYDRATE,
            parameters : Object.assign({}, persistedState.tournamentinfo, {})
        });
    }
}




