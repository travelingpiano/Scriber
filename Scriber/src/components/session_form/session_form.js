import React from 'react';


class SessionForm extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
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
    )
  }

}
