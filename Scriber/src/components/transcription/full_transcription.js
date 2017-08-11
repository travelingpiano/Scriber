import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class FullTranscription extends Component {

  constructor(props) {
    super(props);
  }

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  // returns the time of the snippet as an absolute time (createdTime plus timestamp start time)
  // createdTime format: 'XX:XX:XX.XXXX'
  // time format: X.X.XX
  absoluteTime(createdTime, time) {

  }

  render() {
    let allSnippets = null;
    if (this.props.transcription) {
      let { transcription, createdTime } = this.props;
      console.log(this.props);
      let currentSpeaker = null;
      let minute = 0;
      allSnippets = transcription.map((snippet,idx) => {
        console.log(JSON.parse(snippet).timestamps[0]);
        return (
          <View key={`snippet-${idx}`}>
            <Text>Speaker: {JSON.parse(snippet).speaker}</Text>
            <Text>{JSON.parse(snippet).text}</Text>
            <Text>{JSON.parse(snippet).timestamps[0]}</Text>
          </View>
        );
      });
    }

    return (
      <View>
        {allSnippets}
      </View>
    );



  }

}

export default FullTranscription;

const styles = StyleSheet.create({

  time: {
    flex: .2,
    justifyContent: 'center',
    padding: 10
  },


});
