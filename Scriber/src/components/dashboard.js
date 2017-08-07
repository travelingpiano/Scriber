import React from 'react';
import { Text,
         StyleSheet,
         View } from 'react-native';

const Dashboard = ({ children }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }>
        { children }
      </Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  viewStyle: {

  },

  textStyle: {
    fontSize: 50
  },
});
