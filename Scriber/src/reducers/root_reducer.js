import {combineReducers} from 'redux';
import SessionReducer from './session_reducer';
import TranscriptionReducer from './transcription_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  transcription: TranscriptionReducer
});

export default RootReducer;
