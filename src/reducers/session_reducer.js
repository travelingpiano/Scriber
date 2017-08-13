import merge from 'lodash/merge';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

const defaultState = {
  currentUser: null
};

const SessionReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log(action.currentUser);
      return action.currentUser;
    // case RECEIVE_ERRORS:
    //   const errors = action.errors;
    //   return Object.assign({}, state, {errors});
    default:
      return state;
  }
};

export default SessionReducer;
