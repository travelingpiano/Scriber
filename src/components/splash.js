import React from 'react';
import { Text,
         StyleSheet,
         View,
         Image,
         AsyncStorage,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

class Splash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.getUser()
    };
  }

  getUser() {
    // AsyncStorage.getItem('username').then(result => this.setState({currentUser: result}));
    AsyncStorage.getItem('username').then(result => {
      this.setState({currentUser: result});
    });
  }

  render() {
    const { textStyle, viewStyle, buttonStyle, allButtons, imageStyle } = styles;
    return (
      <View style={ viewStyle }>
        <Image style={ imageStyle } resizeMode="contain" source={require('../../assets/Scriber-Logo.png')} />
        <View style={ allButtons }>
          <Button
            onPress={() => Actions.SignupForm()}
            style={ buttonStyle }
            activeOpacity={.8} >
            <Text style={ styles.buttonText }>
              SIGN UP
            </Text>
          </Button>
          <Button
            onPress={() => {
              if (this.state.currentUser) {
                Actions.TranscriptionIndex();
              } else {
                Actions.LoginForm();
              }
            }}
            style={ buttonStyle }
            activeOpacity={.8}>
            <Text style={ styles.buttonText }>
              LOGIN
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  allButtons: {
    flex: .3
  },

  imageStyle: {
    width: 300,
    flex: .6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    minWidth: 250,
    margin: 5,
    backgroundColor: '#F26367',
    borderColor: '#F26367'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

  viewStyle: {
    flex: 1,
    backgroundColor: '#5BCAD3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 50,
    flex: .5,
  },
});
