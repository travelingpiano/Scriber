import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TranscriptionsReducer from './transcriptions_reducer';
import UsersReducer from './users_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  transcriptions: TranscriptionsReducer,
  users: UsersReducer,
});

export default RootReducer;
