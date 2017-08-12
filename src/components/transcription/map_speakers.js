import merge from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { fetchTranscription } from '../../actions/transcription_actions';
import {Actions} from 'react-native-router-flux';


class MapSpeakers extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);

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

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  renderSpeakersList() {
    if (this.state.allSpeakers) {
      console.log(this.state.allSpeakers);
      this.state.allSpeakers.map((speaker, idx) => {
        return (
          <View key={`speaker-${idx}`}>
            <Text>{speaker}</Text>
          </View>
        );
      });
    }
  }

  render() {
    this.state.currentSpeaker = null;
    if (this.props.currentTranscription) {
      let { currentTranscription, createdTime } = this.props;
      this.state.allSnippets = currentTranscription.transcription.map((snippet,idx) => {
        return (
          <View key={`snippet-${idx}`}>
            {this.renderSpeaker(snippet)}
            <Text style={styles.timeStamps}>{JSON.parse(snippet).timestamps[0]}</Text>
            <Text>{JSON.parse(snippet).text}</Text>
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.speakersList}>
          {this.renderSpeakersList()}
        </View>
        <ScrollView style={styles.snippets}>
          {this.state.allSnippets}
        </ScrollView>
      </View>
    );

  }

}

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
  },

  snippets: {
    flex: .5,
  },

  speakersList: {
    flex: .5,
  },

  container: {
    flex: 1
  }

});

const mapStateToProps = state => ({
  currentTranscription: state.transcriptions.currentTranscription
});

export default connect(mapStateToProps, { fetchTranscription })(MapSpeakers);
