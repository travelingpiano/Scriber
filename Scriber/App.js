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
          'error': 'ERROR'
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

    let response = await fetch('https://scriber.us/o/token', { // adjust to actual site url
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Origin': '',
        'Host': 'scriber.us',
      },
      body: data
    });

    let responseJson = await repsonse.json();
    if (responseJson.hasOwnProperty('error')) {
      this.setState({
        'error': responseJson.error
      });
    } else {
      AsyncStorage.setItem('token', responseJson.access_token);
      this.setState({
        'token': responseJson.access_token
      });
      this.getData(this.state.token);
    }
  }

  async getData(token) {
    let response = await fetch ('https://scriber.us/mobil/user', { // adjust to actual site url
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Authorization': 'Bearer'+token,
          'Host': 'scriber.us',
        },
      }
    );

    let responseJson = await response.json();
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
            textStyle,
            textInputStyle,
            buttonStyle,
            listViewStyle,
            welcomeStyle } = styles;

    if (this.state.token) {
      return (
        <ListView dataSource={ this.state.users }
                  renderRow={ this.renderUsers }
                  style={ listView } />
      );
    } else {
      return (
        <View style={ containerStyle }>
          <Text style={ welcomeStyle }>
            Scriber!!!
          </Text>
          <TextInput style={ textInputStyle }
                     onChangeText={ username =>
                       this.setState({
                         'username': username
                       })
                     }
                     value={ this.state.username } />

          <TextInput secureTextEntry={ true }
                     style={ textInputStyle }
                     onChangeText={ password =>
                       this.setState({
                         'password': password
                       })
                     }
                     value={ this.state.password } />
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
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 40,
  },

  textInputStyle: {

  },

  buttonStyle: {

  },

  listViewStyle: {
    fontSize: 25,
  },

  welcomeStyle: {
    fontSize: 45,
  },

  errorStyle: {

  },
});
