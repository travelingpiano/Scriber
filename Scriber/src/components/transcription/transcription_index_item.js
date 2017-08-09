import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { CardSection } from './common';

class TranscriptionIndexItem extends Component {
  // onRowPress() {
  //   Actions.employeeEdit({ employee: this.props.employee });
  // }

  render() {
    const { title } = this.props.transcription;

    return (
      <View>
        <Text style={styles.titleStyle}>
          { title }
        </Text>
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
