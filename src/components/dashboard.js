import React from 'react';
import { AsyncStorage,
         Text,
         StyleSheet,
         TouchableOpacity,
         TouchableHighlight,
         ListView,
         View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

  }

  logoutUser(){
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

          <TouchableHighlight
            onPress={ () =>
            Actions.RecordAudio()}
            style={ buttonStyle } >
            <Text>
              Record Audio
            </Text>
          </TouchableHighlight>

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

  // buttonStyle: {
  //   minWidth: 200,
  //   margin: 5,
  //   backgroundColor: '#FF4242',
  // },

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
