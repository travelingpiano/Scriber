import React from 'react';
import { Text,
         StyleSheet,
         View } from 'react-native';

const Header = ({ children }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }>
        { children }
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  viewStyle: {

  },

  textStyle: {
    fontSize: 50
  },
});
