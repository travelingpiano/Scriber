import React from 'react';
import { Text,
         StyleSheet,
         View,
         Button,
         Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Splash = ({ children }) => {
  const { textStyle, viewStyle, buttonStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }>
        { children }
      </Text>
      <View style={ buttonStyle }>
        <Button
          onPress={() => Actions.SignupForm()}
          title="Sign Up"
        />
      </View>
      <View style={ buttonStyle }>
        <Button
          onPress={() => Actions.LoginForm()}
          title="Login"
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 200,
    margin: 5,
    backgroundColor: '#FF4242',
  },

  viewStyle: {

  },

  textStyle: {
    fontSize: 50
  },
});
