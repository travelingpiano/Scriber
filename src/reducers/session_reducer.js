import merge from 'lodash/merge';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state=defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
    // case RECEIVE_CURRENT_USER:
    //   const currentUser = action.currentUser;
    //   return Object.assign({}, defaultState, {
    //     currentUser
    //   });
    // case RECEIVE_ERRORS:
    //   const errors = action.errors;
    //   return Object.assign({}, state, {errors});
    default:
      return state;
  }
};

export default SessionReducer;
