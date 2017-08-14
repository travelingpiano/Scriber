import {connect} from 'react-redux';
import TranscriptionEdit from './transcription_edit';
import { updateTranscription, fetchTranscription }
  from '../../actions/transcription_actions';

const mapStateToProps = (state) => ({
  currentTranscription: state.transcriptions.currentTranscription
});

const mapDispatchToProps = (dispatch) => ({
  updateTranscription: (transcription) => dispatch(updateTranscription(transcription)),
  fetchTranscription: (id) => dispatch(fetchTranscription(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(TranscriptionEdit);
