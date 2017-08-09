import {RECEIVE_TRANSCRIPTION, RECEIVE_TRANSCRIPTIONS,
  DESTROY_TRANSCRIPTION} from '../actions/transcription_actions';
import merge from 'lodash/merge';

const defaultState = () => ({
  transcriptions: {},
  currentTranscription: null,
});


const TranscriptionsReducer = (state=defaultState(), action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
    case RECEIVE_TRANSCRIPTION:
      const transcription = action.transcription;
      return merge({}, state,
        {
          transcriptions: {[transcription.id]: transcription},
          currentTranscription: transcription.id
        });
    case RECEIVE_TRANSCRIPTIONS:
      const transcriptions2 = action.transcriptions;
      return Object.assign({}, defaultState(), {transcriptions: transcriptions2});
    case DESTROY_TRANSCRIPTION:
      nextState = Object.assign({},state);
      delete nextState.transcriptions[action.transcription.id];
      return nextState;
    default:
      return state;
  }
};

export default TranscriptionsReducer;
