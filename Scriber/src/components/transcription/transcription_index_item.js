import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { CardSection } from './common';

class TranscriptionIndexItem extends Component {
  onRowPress() {
    Actions.TranscriptionShow({ transcription: this.props.transcription });
  }

  render() {
    const { title } = this.props.transcription;

    return (

      <View>
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View>
            <Text style={styles.titleStyle}>
              { title }
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={styles.titleStyle}>
            HELLO
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default TranscriptionIndexItem;
