import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FullTranscription from './full_transcription';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTranscription(this.props.transcriptionPk);
    console.log(this.props);
  }

  render() {
    console.log(this.props.currentTranscription);
    if (this.props.currentTranscription) {
      let transcription = this.props.currentTranscription;
      return (
        <View style={styles.header}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{transcription.title}</Text>
          </View>
          <View style={styles.additional}>
            <Text>Date:{transcription.created_date}</Text>
          </View>
          <View style={styles.transcription}>
            <FullTranscription transcription={transcription.transcription} />
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
    flex: .2,
    padding: 10
  },
  transcription: {
    flex: .5,
  }

});
