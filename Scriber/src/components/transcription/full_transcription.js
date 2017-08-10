import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class FullTranscription extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let transcription = this.props.transcription;
    console.log(transcription);
    return (
      <View style={styles.header}>
        <Text>Hello</Text>
      </View>
    );
  }

  
}

export default FullTranscription;

const styles = StyleSheet.create({

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
