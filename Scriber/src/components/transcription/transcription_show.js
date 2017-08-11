import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import FullTranscription from './full_transcription';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.fetchTranscription(this.props.transcriptionPk);
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
            <Text style={{fontSize: 15}}>Attendees: </Text>
            {this.renderAttendees(transcription.usernames)}
        </View>
          <View style={styles.transcription}>
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

});
