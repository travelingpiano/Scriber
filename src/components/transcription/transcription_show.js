import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import FullTranscription from './full_transcription';
import { Actions } from 'react-native-router-flux';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    console.log(this.props);
    if (this.props.transcriptionPk) {
      this.props.fetchTranscription(this.props.transcriptionPk);
    } else {
      this.props.fetchTranscription(this.props.currentTranscription.pk);
    }
  }

  parseTime(theTime) {
    if (theTime) {
      let parsed = '';
      let timeArr = theTime.split(':');
      let hours = parseInt(timeArr[0]);
      let timeRange = 'AM';
      if (hours === 12) {
        timeRange = 'PM';
      }
      if (hours > 12) {
        timeRange = 'PM';
        hours = hours-12;
      }
      hours = hours.toString();
      parsed = hours+":"+timeArr[1]+' '+timeRange;
      return parsed;
    } else {
      return null;
    }
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

  renderDelete() {
    if (this.props.currentTranscription.usernames[0] === this.state.currentUser) {
      return (
        <TouchableHighlight
          onPress={ () =>
          this.props.deleteTranscription()}
          style={ styles.buttonStyle } >
          <Text>
            Delete
          </Text>
        </TouchableHighlight>
      );
    }
  }

  render() {
    if (this.props.currentTranscription) {
      let transcription = this.props.currentTranscription;
      let parsedTime = this.parseTime(transcription.created_time);
      return (
        <View style={styles.header}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{transcription.title}</Text>
          </View>
          <View style={styles.additional}>
            <Text style={{fontSize: 15}}>Date: {transcription.created_date}</Text>
            <Text style={{fontSize: 15}}>Time: {parsedTime}</Text>
            <Text style={{fontSize: 15}}>{transcription.description}</Text>
            <Text style={{fontSize: 15}}>Attendees:</Text>
            {this.renderAttendees(transcription.usernames)}
          </View>
          <View style={styles.transcription}>
            <TouchableHighlight
              underlayColor="#E3DAED"
              activeOpacity={1}
              onPress={ () =>
              Actions.MapSpeakers()}
              style={ styles.buttonStyle } >
              <Text>
                Map Speakers
              </Text>
            </TouchableHighlight>
            <FullTranscription transcription={transcription.transcription}
              createdTime={transcription.created_time} parseTime={this.parseTime}/>
          </View>
        </View>
      );
    }
  }
}

export default TranscriptionShow;

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  titleView: {
    backgroundColor: 'pink',
    flex: .2,
    justifyContent: 'center',
    padding: 10
  },
  title: {
    fontSize: 30,
    textAlignVertical: 'center',
  },
  additional: {
    padding: 10,
  },
  transcription: {
    flex: .6,
  },

  buttonStyle: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
    minWidth: 50,
    flex: 0.2,
  },

});
