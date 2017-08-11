import { fetchUsers } from '../lib/users_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const requestUsers = () => dispatch => {
  return fetchUsers()
    .then(resp => resp.json())
    .then(json => dispatch(receiveUsers(json))
  );
};
