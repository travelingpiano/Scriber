import React from 'react';
import { Provider } from 'react-redux';
import { createStore,
         applyMiddleware,
         combineReducers,
         compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import {
         StyleSheet,
         Text,
         View } from 'react-native';

import Routes from './src/Routes';
import { Actions } from 'react-native-router-flux';
import configureStore from './src/store/store';

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

    let store = configureStore();

      return (
        <Provider store={store}>
          <Routes />
        </Provider>
      );
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#C6F1E4',
    flexDirection: 'column',
    justifyContent: 'center',
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
