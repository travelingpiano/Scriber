import merge from 'lodash';
import React, { Component } from 'react';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
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
