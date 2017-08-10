import {connect} from 'react-redux';

import {createTranscription} from '../../actions/transcription_actions';
import TranscriptionForm from './transcription_form';

const mapStateToProps = state => {
  return {
    transcriptions: state.transcriptions
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTranscription: id => dispatch(fetchTranscription(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptionForm);
