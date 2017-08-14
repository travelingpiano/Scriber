import {connect} from 'react-redux';
import { fetchTranscription, deleteTranscription }
  from '../../actions/transcription_actions';
import TranscriptionShow from './transcription_show';

const mapStateToProps = (state,ownProps) => {
  return {
    currentTranscription: state.transcriptions.currentTranscription
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTranscription: id => dispatch(fetchTranscription(id)),
  deleteTranscription: transcription => dispatch(deleteTranscription(transcription))
});

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptionShow);
