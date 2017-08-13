import React from 'react';
import { StyleSheet,
         View,
         ListView,
         Button,
         Text,
         TextInput,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import {createTranscription} from '../../actions/transcription_actions';



class TranscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('form props', this.props);
    this.state = {
      title:'',
      transcription: '',
      description: '',
      audio_url:'',
      usernames: []
    };

    this.createTranscription = this.props.createTranscription.bind(this);
    this.addTranscription = this.addTranscription.bind(this);
  }

  // recordAudio() {
  //   insert record audio action
  //   return audio file
  // }

  addTranscription() {
    let data = new FormData();
    data.append('title', this.state.title);
    data.append('transcription', this.state.transcription);
    data.append('description', this.state.description);
    data.append('audio_url', this.state.audio_url);
    data.append('usernames', this.state.usernames);
    this.props.createTranscription(data)
      .then(Actions.TranscriptionShow());
  }

  render() {
    const { textInputStyle,
            attendeeTabStyle,
            formStyle,
            headerStyle,
            recordAudioStyle,
            transcriptionFormStyle } = styles;

    return (
      <View style={ transcriptionFormStyle } >
        <View style={ headerStyle }>
          <Text>
            New Transcription
          </Text>
        </View>

        <View style={ formStyle }>
          <TextInput
            style={ textInputStyle }
            label='Title'
            placeholder='Title'
            />
          <TextInput
            style={ textInputStyle }
            label='Description'
            placeholder='Description'
          />
        </View>

        <View style={ attendeeTabStyle }>
          <Text>
            Attendees
          </Text>
          <Button
            onPress={() => Actions.Attendees()}
            title='Add Attendees'
          />
      </View>

        <View style={ recordAudioStyle }>
          <Button
            onPress={() => Actions.RecordAudio({users: this.props.users})}
            title="Record Audio"
          />
        </View>

        <View>
          <Button
            onPress={() => this.addTranscription()}
            title="Create Transcription"
            />
        </View>
      </View>
    );
  }
}
// got to a new page with list of attendees to choose from to pick attendees


const styles = StyleSheet.create({
  transcriptionFormStyle: {
    flex: 1,
  },

  attendeeTabStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerStyle: {
    flex: 1,
  },

  textInputStyle: {
    flex: 1,
  },

  formStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C6F1E4'
  },

  recordAudioStyle: {
    flex: 1
  },
});


const mapDispatchToProps = (dispatch) => ({
  createTranscription: data => dispatch(createTranscription(data)),
});

export default connect(null, mapDispatchToProps)(TranscriptionForm);
