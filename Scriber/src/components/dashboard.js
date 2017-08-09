import React from 'react';
import { AsyncStorage,
         Text,
         StyleSheet,
         TouchableOpacity,
         ListView,
         View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  logoutUser(){
    console.log("LOGGED OUT");
    AsyncStorage.clear();
  }

  render() {

    const { textStyle,
            listViewStyle,
            dashboardStyle,
            buttonStyle } = styles;
    // if (this.state.token) {
      return (
        <View style={ dashboardStyle }>
          <Text style={ textStyle }>Welcome</Text>
          <TouchableOpacity
            style={ buttonStyle }
            onPress={() => {
              this.logoutUser();
              Actions.Splash();
            }}
            >
            <Text>
              Log Out
            </Text>
          </TouchableOpacity>
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
  listViewStyle: {

  },

  textStyle: {
    fontSize: 50
  },

  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#F26367',
    height: 30,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },

  dashboardStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  }
});
