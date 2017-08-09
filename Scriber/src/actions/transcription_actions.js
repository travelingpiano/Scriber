// import {receiveErrors, clearErrors} from './error_actions';

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
