import merge from 'lodash';
import React, { Component } from 'react';
import { Text } from 'react-native';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this.props.fetchTranscription();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <Text>Transcription!</Text>
    );
  }
}

export default TranscriptionShow;
