import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TranscriptionsReducer from './transcriptions_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  transcriptions: TranscriptionsReducer
});

export default RootReducer;
