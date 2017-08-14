import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Sound from 'react-native-sound';

class FullTranscription extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSpeaker: null,
      allSpeakers: [],
      allSnippets: null,
    };
  }

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  // NOTE: not finished/needed? Delete this if not going to use!
  // returns the time of the snippet as an absolute time (createdTime plus timestamp start time)
  // createdTime format: 'XX:XX:XX.XXXX'
  // time format: X.X.XX
  absoluteTime(createdTime, time) {
    let parsed = '';
    let createdTimeInt = createdTime.split(':');
    let createdHour = parseInt(createdTimeInt[0]);
    let createdMin = parseInt(createdTimeInt[1]);
    let createdSec = parseInt(createdTimeInt[2].substring(0,2));
    let currentTime = time.toString().split('.');
    let currentHour = 0;
    let currentMin = 0;
    if (currentTime.length === 3) {
      currentHour = currentTime[0];
    }
  }

  renderSpeaker(snippet) {
    if (!this.state.allSpeakers.includes(JSON.parse(snippet).speaker)) {
      this.state.allSpeakers.push(JSON.parse(snippet).speaker);
    }
    if (JSON.parse(snippet).speaker === this.state.currentSpeaker) {
      return null;
    } else {
      this.state.currentSpeaker = JSON.parse(snippet).speaker;
      return (
        <Text style={styles.speaker}>Speaker: {JSON.parse(snippet).speaker}</Text>
      );
    }
  }

  playAudio(transcription,snippet) {
    snippet = JSON.parse(snippet);
    let track = new Sound(`https://s3-us-west-2.amazonaws.com/scriberflexproject/${snippet.filename}`, null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        track.play();
      }
    });
  }

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  // NOTE: not finished/needed? Delete this if not going to use!
  // returns the time of the snippet as an absolute time (createdTime plus timestamp start time)
  // createdTime format: 'XX:XX:XX.XXXX'
  // time format: X.X.XX
  absoluteTime(createdTime, time) {
    let parsed = '';
    let createdTimeInt = createdTime.split(':');
    let createdHour = parseInt(createdTimeInt[0]);
    let createdMin = parseInt(createdTimeInt[1]);
    let createdSec = parseInt(createdTimeInt[2].substring(0,2));
    let currentTime = time.toString().split('.');
    let currentHour = 0;
    let currentMin = 0;
    if (currentTime.length === 3) {
      currentHour = currentTime[0];
    }
  }

  renderSpeaker(snippet) {
    if (JSON.parse(snippet).speaker === this.state.currentSpeaker) {
      return null;
    } else {
      this.state.currentSpeaker = JSON.parse(snippet).speaker;
      return (
        <Text style={styles.speaker}>Speaker: {JSON.parse(snippet).speaker}</Text>
      );
    }
  }

  render() {
    this.state.currentSpeaker = null;
    if (this.props.transcription) {
      let { transcription, createdTime } = this.props;
      this.state.allSnippets = transcription.map((snippet,idx) => {
        return (
          <TouchableHighlight key={`snippet-${idx}`} style={styles.snippet}
            underlayColor="#CEE4ED" activeOpacity={1} onPress={() => this.playAudio(transcription,snippet)}>
            <View>
              {this.renderSpeaker(snippet)}
              <Text style={styles.timeStamps}>{JSON.parse(snippet).timestamps[0]}</Text>
              <Text>{JSON.parse(snippet).text}</Text>
            </View>
          </TouchableHighlight>
        );
      });
    }

    return (
      <ScrollView>
        {this.state.allSnippets}
      </ScrollView>
    );
  }
}

export default FullTranscription;

const styles = StyleSheet.create({
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
  }


});
