import merge from 'lodash';
import React, { Component } from 'react';
<<<<<<< HEAD
import { Text, View } from 'react-native';
=======
import { Text } from 'react-native';
>>>>>>> master

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
<<<<<<< HEAD
    this.props.fetchTranscription(this.props.transcription.pk);
    console.log(this.props);
=======
    this.props.fetchTranscription();
  }

  componentWillReceiveProps(nextProps) {

>>>>>>> master
  }

  render() {
    return (
<<<<<<< HEAD
      <View>
        <Text>{this.props.transcription.title}</Text>
        <Text>{this.props.transcription.audio_url}</Text>
        <Text>{this.props.transcription.created_date}</Text>
        <Text>{this.props.transcription.transcription}</Text>
      </View>
=======
      <Text>Transcription!</Text>
>>>>>>> master
    );
  }
}

export default TranscriptionShow;
