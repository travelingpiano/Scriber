import React from 'react';
import { Text,
         StyleSheet,
         View } from 'react-native';

const Splash = ({ children }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }>
        { children }
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  viewStyle: {

  },

  textStyle: {
    fontSize: 50
  },
});
