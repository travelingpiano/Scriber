// import {receiveErrors, clearErrors} from './error_actions';
import * as TranscriptionAPIUtil from '../lib/transcriptions_api_util';

export const RECEIVE_TRANSCRIPTION = 'RECEIVE_TRANSCRIPTION';
export const RECEIVE_TRANSCRIPTIONS = 'RECEIVE_TRANSCRIPTIONS';
export const DESTROY_TRANSCRIPTION = 'DESTROY_TRANSCRIPTION';

// synchronous action creators
export const receiveTranscription = transcription => ({
  type: RECEIVE_TRANSCRIPTION,
  transcription
});

export const receiveTranscriptions = transcriptions => ({
  type: RECEIVE_TRANSCRIPTIONS,
  transcriptions
});

export const destroyTranscription = transcription => ({
  type: DESTROY_TRANSCRIPTION,
  transcription
});

// async thunk action creators
export const fetchTranscription = (id) => dispatch => {
  return TranscriptionAPIUtil.fetchTranscription(id)
  .then(resp => resp.json())
  .then( json => {dispatch(receiveTranscription(json));
  return json;
  });
};

export const fetchTranscriptions = () => dispatch => {
  return TranscriptionAPIUtil.fetchTranscriptions()
  .then(resp => resp.json())
  .then(json => dispatch(receiveTranscriptions(json))
  );
};
