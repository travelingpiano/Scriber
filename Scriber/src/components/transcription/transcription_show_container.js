import {connect} from 'react-redux';
import { fetchTranscription, deleteTranscription }
  from '../../actions/transcription_actions';
import TranscriptionShow from './transcription_show';

// import {clearErrors} from '../../actions/error_actions';

const mapStateToProps = (state,ownProps) => {
  return {
    currentTranscription: state.transcriptions.currentTranscription
    // currentUser: state.session.currentUser,
    // errors: state.errors.errors
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTranscription: id => dispatch(fetchTranscription(id)),
  deleteTranscription: transcription => dispatch(deleteTranscription(transcription))
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps,mapDispatchToProps)(TranscriptionShow);
