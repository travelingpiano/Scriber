import {connect} from 'react-redux';

import {createTranscription} from '../../actions/transcription_actions';
import TranscriptionForm from './transcription_form';

const mapStateToProps = state => {
  return {
    transcriptions: state.transcriptions,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  createTranscription: data => dispatch(createTranscription(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptionForm);
