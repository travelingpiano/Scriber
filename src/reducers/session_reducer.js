import merge from 'lodash/merge';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      console.log(action.currentUser);
      return Object.assign({}, defaultState, {
        currentUser
      });
    // case RECEIVE_ERRORS:
    //   const errors = action.errors;
    //   return Object.assign({}, state, {errors});
    default:
      return state;
  }
};

export default SessionReducer;
