import * as SessionAPIUtil from '../lib/session_api_util';
import {receiveErrors, clearErrors} from './error_actions';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
// import { fetchUser, updateUser } from '../util/users_api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout().then(
    user => dispatch(receiveCurrentUser(null))
  );
};

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    error => dispatch(receiveErrors(error.responseJSON))
  );
};
