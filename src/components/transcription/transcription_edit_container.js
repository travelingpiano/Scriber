import {connect} from 'react-redux';
import TranscriptionEdit from './transcription_edit';
import { updateTranscription, fetchTranscription }
  from '../../actions/transcription_actions';
// import {clearErrors} from '../../actions/error_actions';

const mapStateToProps = (state) => ({
  currentTranscription: state.transcriptions.currentTranscription
  // errors: state.errors.errors
});

const mapDispatchToProps = (dispatch) => ({
  updateTranscription: (transcription) => dispatch(updateTranscription(transcription)),
  fetchTranscription: (id) => dispatch(fetchTranscription(id)),
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps,mapDispatchToProps)(TranscriptionEdit);
