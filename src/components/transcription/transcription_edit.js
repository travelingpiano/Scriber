import React from 'react';
import { StyleSheet,
         View,
         ListView,
         Button,
         Text,
         TextInput,
         TouchableHighlight,
         ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import merge from 'lodash';

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

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  renderSpeaker(snippet) {
    if (!this.allSpeakers.includes(JSON.parse(snippet).speaker)) {
      this.allSpeakers.push(JSON.parse(snippet).speaker);
    }
    if (JSON.parse(snippet).speaker === this.currentSpeaker) {
      return null;
    } else {
      this.currentSpeaker = JSON.parse(snippet).speaker;
      return (
        <Text style={styles.speaker}>Speaker: {JSON.parse(snippet).speaker}</Text>
      );
    }
  }

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  renderSpeakersList() {
    if (this.allSpeakers) {
      console.log(this.allSpeakers);
      return this.allSpeakers.map((speaker, idx) => {
        if (Number.isInteger(speaker)) {
          return (
            <View key={`speaker-${idx}`}>
              <Text style={styles.speaker}>Speaker {speaker}</Text>
            </View>
          );
        } else {
          return (
            <View key={`speaker-${idx}`}>
              <Text style={styles.speaker}>{speaker}</Text>
            </View>
          );
        }
      });
    }
  }

  render() {
    const { textInputStyle,
            attendeeTabStyle,
            formStyle,
            headerStyle,
            recordAudioStyle,
            transcriptionEditStyle } = styles;

    this.currentSpeaker = null;
    this.allSpeakers = [];
    this.allSnippets = null;
    if (this.props.currentTranscription) {
      let { currentTranscription, createdTime } = this.props;
      this.allSnippets = currentTranscription.transcription.map((snippet,idx) => {
        return (
          <View key={`snippet-${idx}`}>
            {this.renderSpeaker(snippet)}
            <Text style={styles.timeStamps}>{JSON.parse(snippet).timestamps[0]}</Text>
            <Text>{JSON.parse(snippet).text}</Text>
          </View>
        );
      });
    }
    console.log(this.allSnippets);

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

        <View style={styles.speakersList}>
          {this.renderSpeakersList()}
        </View>

        <View style={styles.buttonStyle}>
          <Button
            onPress={() => this.updateTranscription()}
            title="Update Transcription"
            />
        </View>

        <View style={styles.container}>
          <ScrollView style={styles.snippets}>
            {this.allSnippets}
          </ScrollView>
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

  recordAudioStyle: {
    flex: 1
  },

  snippet: {
    padding: 10
  },

  time: {
    flex: .2,
    justifyContent: 'center',
    padding: 10
  },

  speaker: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  timeStamps: {
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
  },

  snippets: {
    height: 20,
  },

  speakersList: {
    flex: .3,
  },

  container: {
    flex: .5
  },

  buttonStyle: {
    flex: .1,
  }
});
