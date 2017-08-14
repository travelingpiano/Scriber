import React from 'react';
import { AsyncStorage,
         Text,
         StyleSheet,
         TouchableOpacity,
         TouchableHighlight,
         ListView,
         View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

  }

  logoutUser(){
    AsyncStorage.clear();
  }

  render() {

    const { textStyle,
            dashboardStyle,
            buttonStyle,
            buttonText } = styles;
    // if (this.state.token) {
      return (
        <View style={dashboardStyle}>
          <Button
            onPress={ () => {
              this.logoutUser();
              Actions.Splash();
            }}
            style={ buttonStyle }
            activeOpacity={.8} >
            <Text style={ buttonText }>
              LOG OUT
            </Text>
          </Button>
        </View>
      );
    // }
  }

  renderUser(user) {
    return(
      <View style={styles.list}>
        <Text>
          {user.name}
        </Text>

      </View>

    );
  }

}

export default Dashboard;

const styles = StyleSheet.create({

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

  textStyle: {
    fontSize: 50
  },

  dashboardStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30

  }
});
