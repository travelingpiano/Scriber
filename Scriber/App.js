import React from 'react';
import { Provider } from 'react-redux';
import { createStore,
         applyMiddleware,
         combineReducers,
         compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { AsyncStorage,
         Component,
         Linking,
         ListView,
         StyleSheet,
         Text,
         TextInput,
         TouchableHighlight,
         View } from 'react-native';

import Routes from './src/Routes';
import { Actions } from 'react-native-router-flux';

import Splash from './src/components/splash';

export default class App extends React.Component {
  constructor() {
    super();

  }

  // have a token? - display a list showing our Users
  // don’t have the token? - prompt for the User Credentials

  render() {
    const { containerStyle,
            errorStyle,
            formStyle,
            textStyle,
            textInputStyle,
            buttonStyle,
            listViewStyle,
            welcomeStyle } = styles;

      return (

        <View style={ containerStyle }>
          <Routes />
        </View>
      );
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#C6F1E4',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textStyle: {
    fontSize: 40,
  },

  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
  },

  buttonStyle: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },

  formStyle: {
    flexDirection: 'column',
    height: 50,
    width: null,
    marginTop: 10,
    marginBottom: 10
  },

  listViewStyle: {
    // fontSize: 25,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

  welcomeStyle: {
    fontSize: 45,
  },

  errorStyle: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
});
