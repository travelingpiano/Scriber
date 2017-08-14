import {RECEIVE_TRANSCRIPTION, RECEIVE_TRANSCRIPTIONS,
  DESTROY_TRANSCRIPTION} from '../actions/transcription_actions';
import merge from 'lodash/merge';

const defaultState = () => ({
  transcriptions: {},
  currentTranscription: {},
});

const TranscriptionsReducer = (state=defaultState(), action) => {
  Object.freeze(state);
  let nextState;
  switch (action.type) {
    case RECEIVE_TRANSCRIPTION:
      const transcription = action.transcription;
      let newMerged = merge({},state);
      newMerged.currentTranscription = action.transcription;
      return newMerged;
    case RECEIVE_TRANSCRIPTIONS:
      const transcriptions2 = action.transcriptions;
      return merge({}, defaultState(), {transcriptions: transcriptions2});
    case DESTROY_TRANSCRIPTION:
      nextState = merge({},state);
      delete nextState.transcriptions[action.transcription.pk];
      return nextState;
    default:
      return state;
  }
};

export default TranscriptionsReducer;
