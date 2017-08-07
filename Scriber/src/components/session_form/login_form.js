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

import config from './src/lib/config.js';


class SessionForm extends React.Component {

  constructor(props) {
    super(props);

  }

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
      <View>
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
