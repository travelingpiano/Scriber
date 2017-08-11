import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class FullTranscription extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let allSnippets = null;
    if (this.props.transcription) {
      let transcription = this.props.transcription;
      allSnippets = transcription.map((snippet,idx) => {
        return (
          <View key={`snippet-${idx}`}>
            <Text>Speaker: {JSON.parse(snippet).speaker}</Text>
            <Text>{JSON.parse(snippet).text}</Text>
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
