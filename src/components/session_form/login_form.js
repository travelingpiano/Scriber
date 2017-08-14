import React from 'react';
import { AsyncStorage,
         Component,
         Linking,
         ListView,
         StyleSheet,
         Text,
         TextInput,
         View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import config from '../../lib/config.js';
import Button from 'apsl-react-native-button';

// import {receiveCurrentUser} from '../../actions/session_actions';


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
    console.log(this.props);
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
    console.log(data);
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
      AsyncStorage.setItem('username',username);

      this.setState({
        'token': responseJson.access_token
      })
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
      Actions.tabbar();
    }
  }

  render() {

    const { errorStyle,
            formStyle,
            textInputStyle,
            buttonStyle,
            buttonText,
            oneInput,
            loginViewStyle } = styles;

    return (
      <View style={ loginViewStyle }>
        <View style={ formStyle }>
          <View style={ oneInput }>
            <TextInput
              style={ textInputStyle }
              autoCapitalize = 'none'
              onChangeText={ username =>
                this.setState({
                  'username': username
                })
              }
              value={ this.state.username }
              placeholder="username"/>
          </View>
          <View style={ oneInput }>
            <TextInput
              secureTextEntry={ true }
              style={ textInputStyle }
              onChangeText={ password =>
                this.setState({
                  'password': password
                })
              }
              value={ this.state.password }
              placeholder="password"/>
          </View>
        </View>

        <Button
          onPress={ () =>
          this.getToken(config.client_id,
                         config.client_key,
                         this.state.username,
                         this.state.password)
                  }
          style={ buttonStyle }
          activeOpacity={.8} >
          <Text style={ buttonText }>
            LOGIN
          </Text>
        </Button>

        <Text style={ errorStyle }>
          { this.state.error }
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    alignSelf: 'stretch',
    borderBottomWidth: .5,
    borderColor: 'lightgray',
  },

  formStyle: {
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    flex: .2,
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },

  oneInput: {
    paddingTop: 10,
    alignSelf: 'stretch'
  },

  buttonStyle: {
    width: 250,
    backgroundColor: '#F26367',
    borderColor: '#F26367',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

  loginViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorStyle: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
    flex: 0.2
  },
});

export default LoginForm;
