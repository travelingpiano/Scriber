import React from 'react';
import { Text,
         StyleSheet,
         View,
         Button,
         Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Splash = () => {
  const { textStyle, viewStyle, buttonStyle, allButtons } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }>
        SPLASH!!
      </Text>
      <View style={ allButtons }>
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
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  allButtons: {
    flex: .3
  },

  buttonStyle: {
    minWidth: 200,
    margin: 5,
    backgroundColor: '#FF4242',
  },

  viewStyle: {
    flex: 1,
    backgroundColor: '#C6F1E4',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textStyle: {
    fontSize: 50,
    flex: .5,
  },
});
