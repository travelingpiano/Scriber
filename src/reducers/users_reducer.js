import { RECEIVE_USERS } from '../actions/users_actions';

const defaultState = () => ({
  users: {},
});

const UsersReducer = (state = defaultState(), action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, {users: action.users});
    default:
      return state;
  }
};

export default UsersReducer;
