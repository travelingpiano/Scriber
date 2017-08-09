import React from 'react';
import { Text,
         StyleSheet,
         View,
         Button,
         Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Splash = () => {
  const { textStyle, viewStyle, buttonStyle, allButtons, imageStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Image style={ imageStyle } resizeMode="contain" source={require('../../assets/Scriber-Logo-full.png')} />
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

  imageStyle: {
    width: 350,
    // alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    minWidth: 200,
    margin: 5,
    backgroundColor: '#F26367',
    borderRadius: 10,
  },

  viewStyle: {
    flex: 1,
    backgroundColor: '#5BCAD3',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textStyle: {
    fontSize: 50,
    flex: .5,
  },
});
