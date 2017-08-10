import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this.props.fetchTranscription(this.props.transcription.pk);
    console.log(this.props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.transcription.title}</Text>
        <Text>{this.props.transcription.audio_url}</Text>
        <Text>{this.props.transcription.created_date}</Text>
        <Text>{this.props.transcription.transcription}</Text>
      </View>
    );
  }
}

export default TranscriptionShow;
