import axios from 'axios';
import { browserHistory } from 'react-router'
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        role: role,

    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const auth = (email, password, userType) => {
    return dispatch => {
        dispatch(authStart());
        var authData = new FormData();
        authData.append('username', email);
        authData.append('passwd', password);
        let url = 'http://localhost:5000/api/login';
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                // localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authSuccess(response.data.token, response.data.userId, response.data.role));
                // dispatch(checkAuthTimeout(response.data.expiresIn));
                // dispatch(setAuthRedirectPath(homePath[response.data.role]))
            })
            .catch(err => {
                console.log(err)
                // dispatch(authFail(err.response.data.error));
            });
    };
};

export const signup = (username, email, password, userType) => {
    return dispatch => {
        var data = new FormData();
        data.append('role', userType);
        data.append('passwd', password);
        data.append('username', username);
        data.append('email', email);
        let url = 'http://localhost:5000/api/create_user';
        axios.post(url, data)
            .then(response => {
                console.log(response)
                if(response.data.code===201){alert('Successfully sign up!')}else{
                    alert('Failed!')
                }

            })
            .catch(err => {
                console.log(err)
                // dispatch(authFail(err.response.data.error));
            });
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};