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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      username: '',
      password: '',
      error: '',
      users: new ListView.DataSource(
        {
          rowHasChanged: (row1, row2) => row1 !== row2,
        }
      ),
    };
  }

  componentDidMount() {
    this.loadInitialState().done();
  }

  async loadInitialState() {
    try {
      let token = await AsyncStorage.getItem('token');
      if (token !== null ) {
        this.setState({
          token: token
        });
        this.getData(this.state.token);
      } else {
        this.setState({
          'error': 'LogIn'
        })
      }
    } catch (error) {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Scriber!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
