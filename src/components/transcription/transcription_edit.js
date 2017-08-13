import React from 'react';
import { StyleSheet,
         View,
         ListView,
         Button,
         Text,
         TextInput,
         TouchableHighlight,
         ScrollView,
         Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import merge from 'lodash';
import MapSpeakers from './map_speakers';

class TranscriptionEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = this.props.currentTranscription;
  }

  updateTranscription() {
    let data = new FormData();
    data.append('title', this.state.title);
    data.append('transcription', this.state.transcription);
    data.append('description', this.state.description);
    data.append('audio_url', this.state.audio_url);
    data.append('usernames', this.state.usernames);
    data.append('pk',this.state.pk);
    data.append('created_time', this.state.created_time);
    data.append('created_date', this.state.created_date);
    this.props.updateTranscription(data)
      .then(Actions.TranscriptionShow({transcriptionPk: this.state.transcription.pk}));
  }

  renderAttendees(attendees) {
    if (attendees) {
      return(
        <ScrollView containerStyle={{marginBottom:20}}>
          {
            attendees.map((attendee, i) => (
              <Text
                key={i}
                title={attendee}>{attendee}
              </Text>
            ))
          }
        </ScrollView>
      );
    }
  }

  render() {
    const { textInputStyle,
            attendeeTabStyle,
            formStyle,
            headerStyle,
            recordAudioStyle,
            transcriptionEditStyle } = styles;

    return (
      <View style={ transcriptionEditStyle } >
        <View style={ headerStyle }>
          <Text>
            Edit Transcription
          </Text>
        </View>

        <View style={ formStyle }>
          <TextInput
            style={ textInputStyle }
            value={ this.state.title }
            label='Title'
            placeholder='Title'
            onChangeText={ title => this.setState({title})}
            />
          <TextInput
            style={ textInputStyle }
            label='Description'
            value={ this.state.description }
            placeholder='Description'
            onChangeText={ description => this.setState({description})}
          />
        </View>

        <View style={ attendeeTabStyle }>
          <Text>
            Attendees:
          </Text>
          {this.renderAttendees(this.state.usernames)}
          <Button
            onPress={() => Actions.Attendees()}
            title='Edit Attendees'
          />
        </View>

        <MapSpeakers style={{flex:.5}} attendees={this.state.usernames} transcription={this.state} />

        <View style={styles.buttonStyle}>
          <Button
            onPress={() => this.updateTranscription()}
            title="Update Transcription"
            />
        </View>

      </View>
    );
  }
}

export default TranscriptionEdit;

const styles = StyleSheet.create({
  transcriptionEditStyle: {
    flex: 1,
    padding: 10,
  },

  attendeeTabStyle: {
    flex: .3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerStyle: {
    flex: .1,
  },

  textInputStyle: {
    flex: 1,
  },

  formStyle: {
    flex: .2,
    flexDirection: 'column',
    backgroundColor: '#C6F1E4'
  },

  container: {
    flex: .5
  },

  buttonStyle: {
    flex: .1,
  },

  title: {
    fontWeight: 'bold',
    paddingTop: 20
  },

});
