import React from 'react';
import { AsyncStorage,
         Component,
         Linking,
         ListView,
         StyleSheet,
         Text,
         TextInput,
         TouchableHighlight,
         View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import config from '../../lib/config.js';


class LoginForm extends React.Component {

  constructor(props) {
    super(props);
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
    console.log(responseJson);
    if (responseJson.hasOwnProperty('detail')) {
      this.setState({
        'error': responseJson.detail
      });
    } else {
      this.setState({
        'users': this.state.users.cloneWithRows(responseJson)
      });
      console.log(this.state.users);
      Actions.Dashboard();
    }
  }

  render() {

    const { errorStyle,
            formStyle,
            textStyle,
            textInputStyle,
            buttonStyle,
            listViewStyle,
            loginViewStyle,
            welcomeStyle } = styles;

    return (
      <View style={ loginViewStyle}>
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

const styles = StyleSheet.create({
  // viewStyle: {
  //   flex: 1,
  //   backgroundColor: '#C6F1E4',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  // },

  textStyle: {
    fontSize: 40,
  },

  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
  },

  buttonStyle: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
    minWidth: 50,
    flex: 0.2,
  },

  formStyle: {
    flexDirection: 'column',
    height: 50,
    width: null,
    marginTop: 10,
    marginBottom: 10,
    flex: 0.5
  },

  listViewStyle: {
    // fontSize: 25,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

  loginViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  welcomeStyle: {
    fontSize: 45,
  },

  errorStyle: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
    flex: 0.2
  },
});

export default LoginForm;
