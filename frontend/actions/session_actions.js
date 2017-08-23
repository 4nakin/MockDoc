import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

export const logIn = user => dispatch => (
  APIUtil.login(user).then(currentUser => (
    dispatch(receiveCurrentUser(currentUser))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logOut = () => dispatch => {
  APIUtil.logout().then(user => {
      dispatch(receiveCurrentUser(null));
    });
};

export const signUp = user => dispatch => {
  APIUtil.signUp(user).then(newUser => (
    dispatch(receiveCurrentUser(newUser))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ));
};
