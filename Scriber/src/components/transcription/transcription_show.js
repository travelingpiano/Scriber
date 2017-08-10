import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTranscription(this.props.transcription.pk);
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{this.props.transcription.title}</Text>
        </View>
        <View style={styles.additional}>
          <Text>Date:{this.props.transcription.created_date}</Text>
        </View>
        <View style={styles.transcription}>
          <Text>{this.props.transcription.transcription}</Text>
        </View>
      </View>
    );
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
  }

});
