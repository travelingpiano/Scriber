import * as SessionAPIUtil from '../lib/session_api_util';
// import {receiveErrors, clearErrors} from './error_actions';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {fetchUser} from '../lib/users_api_util';


export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const fetchCurrentUser = id => dispatch => (
  fetchUser(id).then(
    (resp) => {
      if (resp.ok) {
        resp.json()
          .then((obj) => {
            dispatch(receiveCurrentUser(obj));
          });
      }
    }
  )
);
