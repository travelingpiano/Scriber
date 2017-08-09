import {values} from 'lodash';

export const selectAllTranscriptions = ({transcriptions}) => values(transcriptions.transcriptions);
