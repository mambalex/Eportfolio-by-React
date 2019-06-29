import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId, role) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId,
  role,

});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};


export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = new FormData();
  authData.append('username', email);
  authData.append('passwd', password);
  const url = 'http://localhost:5000/api/login';
  axios.post(url, authData)
    .then((response) => {
      // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.token);
      // localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.userId);
      dispatch(authSuccess(response.data.token, response.data.userId, response.data.role));
      // dispatch(checkAuthTimeout(response.data.expiresIn));
      // dispatch(setAuthRedirectPath(homePath[response.data.role]))
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      // dispatch(authFail(err.response.data.error));
    });
};

export const signup = (username, email, password, userType) => () => {
  const data = new FormData();
  data.append('role', userType);
  data.append('passwd', password);
  data.append('username', username);
  data.append('email', email);
  const url = 'http://localhost:5000/api/create_user';
  axios.post(url, data)
    .then((response) => {
      // eslint-disable-next-line no-alert
      if (response.data.code === 201) { alert('Successfully sign up!'); } else {
        // eslint-disable-next-line no-alert
        alert('Failed!');
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      // dispatch(authFail(err.response.data.error));
    });
};


export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
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
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
