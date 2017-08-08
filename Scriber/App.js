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


import config from './src/lib/config.js';
import Header from './src/components/header';

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
    AsyncStorage.clear();
    this.loadInitialState().done();
  }

  async loadInitialState() {
    try {
      let token = await AsyncStorage.getItem('token');
      let username = await AsyncStorage.getItem('username');
      console.log(username);
      if (token !== null ) {
        this.setState({
          token: token, error: null, username: username
        });
        this.getData(this.state.token);
      } else {
        this.setState({
          'error': 'Login Error'
        })
      }
    } catch (error) {

    }
  }

  async getToken(client_id, client_key, username, password) {
    let data = new FormData();
    data.append('grant_type', 'password');
    data.append('client_id', client_id);
    data.append('client_secret', client_key);
    data.append('username', username);
    data.append('password', password);
    console.log(username);
    console.log(password);
    let response = await fetch('http://127.0.0.1:8000/o/token/', { // adjust to actual site url
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Origin': '',
        'Host': '127.0.0.1:8000',
      },
      body: data
    });

    let responseJson = await response.json();
    if (responseJson.hasOwnProperty('error')) {
      this.setState({
        'error': responseJson.error
      });
    } else {
      AsyncStorage.setItem('token', responseJson.access_token);
      AsyncStorage.setItem('username',username)
      this.setState({
        'token': responseJson.access_token
      });
      this.getData(this.state.token);
    }
  }

  async getData(token) {
    let response = await fetch ('http://127.0.0.1:8000/users', { // adjust to actual site url
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Authorization': 'Token '+token,
          'Host': '127.0.0.1:8000',
        },
      }
    );

    let responseJson = await response.json();
    console.log(response);
    console.log(responseJson);
    console.log(this.state);
    // console.log(this.state);
    if (responseJson.hasOwnProperty('detail')) {
      this.setState({
        'error': responseJson.detail
      });
    } else {
      this.setState({
        'user': this.state.users.cloneWithRows(responseJson)
      });
    }
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

    if (this.state.token) {
      return (
        <ListView dataSource={ this.state.users }
                  renderRow={ this.renderUser }
                  style={ listViewStyle } />
      );
    } else {
      return (
        <View style={ containerStyle }>
          <Header logo={ 'Scriber' } style={ welcomeStyle }>
            Scriber!!!
          </Header>

          <View style={ formStyle }>
            <TextInput style={ textInputStyle }
              onChangeText={ username =>
                this.setState({
                  'username': username
                })
              }
              value={ this.state.username }
              placeholder="username"/>

            <TextInput secureTextEntry={ true }
              style={ textInputStyle }
              onChangeText={ password =>
                this.setState({
                  'password': password
                })
              }
              value={ this.state.password }
              placeholder="password"/>
          </View>

          <TouchableHighlight onPress={ () =>
            this.getToken(config.client_id,
                           config.client_key,
                           this.state.username,
                           this.state.password) }
                              style={ buttonStyle } >
            <Text>
              LogIn
            </Text>
          </TouchableHighlight>

          <Text style={ errorStyle }>
            { this.state.error }
          </Text>
        </View>
      );
    }
  }

  renderUser(user) {
    return(
      <View style={styles.list}>
        <Text>{user.name}</Text>
      </View>

    )
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
