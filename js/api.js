import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import {errorMessages} from './constants';

import {actionTypesUserinfo, defaultStateUserinfo} from './redux/userInfo';
import {actionTypesTournamentinfo, defaultStateTournamentinfo} from './redux/tournamentInfo';
import {actionTypesTournamentlist, defaultStateTournamentlist} from './redux/tournamentList';
import {deleteRequest, getRequest, patchRequest, postRequest} from './redux/backendApi';


function storeOptionalToken(response) {
    if (checkForAuthenticationHeaders(response)) {
        __store.dispatch({
            type: actionTypesUserinfo.STORE_AUTH_HEADERS,
            parameters: {
                accesstoken: response.headers['access-token'],
                client: response.headers['client'],
                expiry: response.headers['expiry'],
                uid: response.headers['uid']
            }
        });
    }
}

function checkForAuthenticationHeaders(response) {
    if (response.headers) {
        const requiredHeaders = [
            'access-token', 'client', 'uid', 'expiry'
        ];
        for (let i = 0; i < requiredHeaders.length; i++) {
            if (!response.headers[requiredHeaders[i]]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const reducerUserinfo = (state = defaultStateUserinfo, action) => {
    switch (action.type) {
    case actionTypesUserinfo.REGISTER:
        postRequest(action.state, '/users', {
            'username': action.parameters.username,
            'email': action.parameters.email,
            'password': action.parameters.password
        }).then(resp => {
            __store.dispatch({
                type: actionTypesUserinfo.REGISTER_RESULT_SUCCESS
            });
            storeOptionalToken(resp);
        }).catch(error => {
            if (error.response) {
                __store.dispatch({
                    'type': actionTypesUserinfo.REGISTER_RESULT_ERROR,
                    'parameters': {
                        'errorMessages': error.response.data.errors.full_messages
                    }
                });
                storeOptionalToken(error.response);
            } else {
                __store.dispatch({
                    'type': actionTypesUserinfo.REGISTER_RESULT_ERROR,
                    'parameters': {
                        'errorMessages': [
                            errorMessages['registration_errorunknown']['en']
                        ]
                    }
                });
            }
        });
        return Object.assign({}, state, {});
    case actionTypesUserinfo.REGISTER_RESULT_SUCCESS:
        return Object.assign({}, state, {
            error: false,
            errorMessages: []
        });
    case actionTypesUserinfo.REGISTER_RESULT_ERROR:
        return Object.assign({}, state, {
            error: true,
            errorMessages: action.parameters.errorMessages
        });
    case actionTypesUserinfo.LOGIN:
        postRequest(action.state, '/users/sign_in', {
            email: action.parameters.email,
            password: action.parameters.password
        }).then(resp => {
            __store.dispatch({
                type: actionTypesUserinfo.LOGIN_RESULT_SUCCESS,
                parameters: {
                    username: resp.data.username,
                    successCallback: action.parameters.successCallback
                }
            });
            storeOptionalToken(resp);
        }).catch(error => {
            if (error.response) {
                __store.dispatch({
                    'type': actionTypesUserinfo.LOGIN_RESULT_ERROR,
                    'parameters': {
                        'errorMessages': error.response.data.errors
                    }
                });
                storeOptionalToken(error.response);
            } else {
                __store.dispatch({
                    'type': actionTypesUserinfo.LOGIN_RESULT_ERROR,
                    'parameters': {
                        'errorMessages': [errorMessages['login_errorunknown']['en']]
                    }
                });
            }
        });
        return Object.assign({}, state, {});
    case actionTypesUserinfo.LOGIN_RESULT_SUCCESS:
        action.parameters.successCallback(action.parameters.username);
        return Object.assign({}, state, {
            isSignedIn: true,
            error: false,
            errorMessages: [],
            username: action.parameters.username
        });
    case actionTypesUserinfo.LOGIN_RESULT_ERROR:
        return Object.assign({}, state, {
            error: true,
            errorMessages: action.parameters.errorMessages
        });
    case actionTypesUserinfo.LOGOUT:
        deleteRequest(action.state, '/users/sign_out').then(() => {
            action.parameters.successCallback();
            __store.dispatch({type: actionTypesUserinfo.CLEAR});
        }).catch(() => {
            __store.dispatch({type: actionTypesUserinfo.CLEAR});
        });
        return Object.assign({}, state, {});
    case actionTypesUserinfo.STORE_AUTH_HEADERS:
        return Object.assign({}, state, {
            accesstoken: action.parameters.accesstoken,
            client: action.parameters.client,
            expiry: action.parameters.expiry,
            uid: action.parameters.uid
        });
    case actionTypesUserinfo.VERIFY_CREDENTIALS:
        getRequest(action.state, '/users/validate_token').then(resp => {
            storeOptionalToken(resp);
        }).catch(() => {
            __store.dispatch({type: actionTypesUserinfo.CLEAR});
        });
        return Object.assign({}, state, {});
    case actionTypesUserinfo.REHYDRATE:
        return Object.assign({}, state, action.parameters, {error: false, errorMessages: []});
    case actionTypesUserinfo.CLEAR:
        return Object.assign({}, state, {
            isSignedIn: false,
            username: null,
            error: false,
            errorMessages: [],

            accesstoken: null,
            client: null,
            expiry: null,
            uid: null
        });
    default: return state;
    }
};

const reducerTournamentinfo = (state = defaultStateTournamentinfo, action) => {
    switch (action.type) {
    case actionTypesTournamentinfo.CREATE_TOURNAMENT:
        postRequest(action.state, '/tournaments', action.parameters.tournament).then(resp => {
            storeOptionalToken(resp);
            action.parameters.successCallback();
        }).catch(() => {
            action.parameters.errorCallback();
        });
        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.REQUEST_TOURNAMENT:
        getRequest(action.state, '/tournaments/' + action.parameters.code).then(resp => {
            __store.dispatch({
                type: actionTypesTournamentinfo.REQUEST_TOURNAMENT_SUCCESS,
                parameters: resp.data
            });
            storeOptionalToken(resp);
            action.parameters.successCallback();
        }).catch(() => {
            action.parameters.errorCallback();
        });
        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.REQUEST_TOURNAMENT_SUCCESS:
        return Object.assign({}, state, {
            code: action.parameters.code,
            description: action.parameters.description,
            id: action.parameters.id,
            name: action.parameters.name,
            ownerUsername: action.parameters.owner_username,
            isPublic: action.parameters.public,
            stages: action.parameters.stages,
            teams: action.parameters.teams
        });
    case actionTypesTournamentinfo.MODIFY_TOURNAMENT:
        patchRequest(action.state, '/teams/' + action.parameters.teamid, {
            name: action.parameters.name
        }).then(resp => {
            storeOptionalToken(resp);
            action.parameters.onSuccess();
        }).catch(error => {
            if (error.response) {
                storeOptionalToken(error.response);
            }
            action.parameters.onError();
        });
        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.MODIFY_TOURNAMENT_SUCCESS:

        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.MODIFY_TOURNAMENT_ERROR:

        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.REHYDRATE:

        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.START_MATCH:
        patchRequest(action.state, '/matches/' + action.parameters.matchId, {
            state: 'in_progress'
        }).then(resp => {
            storeOptionalToken(resp);
            action.parameters.successCallback();
        }).catch(error => {
            if (error.response) {
                storeOptionalToken(error.response);
            }
            action.parameters.errorCallback();
        });
        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.END_MATCH:
        patchRequest(action.state, '/matches/' + action.parameters.matchId, {
            state: 'finished'
        }).then(resp => {
            storeOptionalToken(resp);
            action.parameters.successCallback(resp.data.winner);
        }).catch(error => {
            if (error.response) {
                storeOptionalToken(error.response);
            }
            action.parameters.errorCallback();
        });
        return Object.assign({}, state, {});
    case actionTypesTournamentinfo.CLEAR:

        return Object.assign({}, state, {});
    default: return state;
    }
};

const reducerTournamentlist = (state = defaultStateTournamentlist, action) => {
    switch (action.type) {
    case actionTypesTournamentlist.FETCH:
        getRequest(action.state, '/tournaments?type=' + action.parameters.type).then(resp => {
            __store.dispatch({
                type: actionTypesTournamentlist.FETCH_SUCCESS,
                parameters: resp.data
            });
            storeOptionalToken(resp);
            action.parameters.successCallback(resp.data);
        }).catch(error => {
            if (error.response) {
                storeOptionalToken(error.response);
            }
            action.parameters.errorCallback();
        });
        return state;
    case actionTypesTournamentlist.FETCH_SUCCESS:
        return Object.assign({}, state, {tournaments: action.parameters});
    default:
        return state;
    }
};

const reducers = {
    userinfo: reducerUserinfo,
    tournamentinfo: reducerTournamentinfo,
    tournamentlist: reducerTournamentlist
};

const defaultApplicationState = {
    userinfo: defaultStateUserinfo,
    tournamentinfo: defaultStateTournamentinfo,
    tournamentlist: defaultStateTournamentlist
};

let __store;
let applicationHydrated = false;

export function initializeStore(initialState = defaultApplicationState) {
    __store = createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    __store.subscribe(() => {
        if (applicationHydrated) {
            localStorage.setItem('reduxState', JSON.stringify(__store.getState()));
        }
    });
    return __store;
}

export function verifyCredentials() {
    rehydrateApplicationState();

    if (__store.getState().userinfo.isSignedIn) {
        __store.dispatch({
            type: actionTypesUserinfo.VERIFY_CREDENTIALS,
            state: __store.getState()
        });
    }
}

export function register(username, email, password) {
    __store.dispatch({
        type: actionTypesUserinfo.REGISTER,
        parameters: {
            username: username,
            email: email,
            password: password
        },
        state: __store.getState()
    });
}

export function login(email, password, successCallback) {
    __store.dispatch({
        type: actionTypesUserinfo.LOGIN,
        parameters: {
            email: email,
            password: password,
            successCallback: successCallback
        },
        state: __store.getState()
    });
}

export function logout(successCallback) {
    __store.dispatch({
        type: actionTypesUserinfo.LOGOUT,
        parameters: {
            successCallback: successCallback
        },
        state: __store.getState()
    });
}

export function createTournament(data, successCallback, errorCallback) {
    __store.dispatch({
        type: actionTypesTournamentinfo.CREATE_TOURNAMENT,
        parameters: {
            tournament: data,
            successCallback: successCallback,
            errorCallback: errorCallback
        },
        state: __store.getState()
    });
}

export function requestTournament(code, successCallback, errorCallback) {
    __store.dispatch({
        type: actionTypesTournamentinfo.REQUEST_TOURNAMENT,
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
        type: actionTypesTournamentinfo.MODIFY_TOURNAMENT,
        parameters: {
            teamid: team.id,
            name: team.name,
            onSuccess: successCB,
            onError: errorCB
        },
        state: __store.getState()
    });
}

export function startMatch(matchId, successCallback, errorCallback) {
    __store.dispatch({
        type: actionTypesTournamentinfo.START_MATCH,
        parameters: {
            matchId: matchId,
            successCallback: successCallback,
            errorCallback: errorCallback
        },
        state: __store.getState()
    });
}

export function endMatch(matchId, successCallback, errorCallback) {
    __store.dispatch({
        type: actionTypesTournamentinfo.END_MATCH,
        parameters: {
            matchId: matchId,
            successCallback: successCallback,
            errorCallback: errorCallback
        },
        state: __store.getState()
    });
}

export function getState() {
    return __store.getState();
}

export function requestTournamentList(type, successCallback, errorCallback) {
    __store.dispatch({
        type: actionTypesTournamentlist.FETCH,
        parameters: {
            type: type,
            successCallback: successCallback,
            errorCallback: errorCallback
        },
        state: __store.getState()
    });
}

function rehydrateApplicationState() {
    const persistedState = localStorage.getItem('reduxState') ?
        JSON.parse(localStorage.getItem('reduxState')) :
        undefined;

    if (persistedState) {
        __store.dispatch({
            type: actionTypesUserinfo.REHYDRATE,
            parameters: Object.assign({}, persistedState.userinfo)
        });
        __store.dispatch({
            type: actionTypesTournamentinfo.REHYDRATE,
            parameters: Object.assign({}, persistedState.tournamentinfo)
        });
        __store.dispatch({
            type: actionTypesTournamentlist.REHYDRATE,
            parameters: Object.assign({}, persistedState.tournamentlist)
        });
        applicationHydrated = true;
    }
}
