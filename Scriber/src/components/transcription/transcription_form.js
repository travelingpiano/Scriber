import React from 'react';
import { StyleSheet,
         View,
         ListView,
         Button,
         Text,
         TextInput,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class TranscriptionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title:'',
      transcription: '',
      location: '',
      url:'',
      attendees: {}
    };

    this.createTranscription = this.createTranscription.bind(this);
  }

  recordAudio() {
    //insert record audio action
    //return audio file
  }

  createTranscription() {
    let data = new FormData();
    data.append('title', this.state.title);
    data.append('transcription', this.state.transcription);
    data.append('location', this.state.location);
    data.appned('url', this.state.url);
    data.append('attendees', this.state.attendees);
    this.props.createTranscription(data);
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
            label='Transcription'
            placeholder='Title'
            />
          <TextInput
            style={ textInputStyle }
            label='Location'
            placeholder='Location'
          />
        </View>

        <View style={ attendeeTabStyle }>
          <Text>
            Attendees
          </Text>
          <Button
            onPress={() => console.log('ADD ATTENDEES')}
            title='+Attendees'
          />
      </View>

        <View style={ recordAudioStyle }>
          <Button
            onPress={() => console.log('RECORD AUDIO')}
            title="Record Audio"
          />
        </View>

        <View>
          <Button
            onPress={() => console.log('CREATE TRANSCRIPTION')}
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
