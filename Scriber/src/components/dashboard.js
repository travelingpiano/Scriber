import React from 'react';
import { AsyncStorage,
         Text,
         StyleSheet,
         TouchableOpacity,
         ListView,
         View } from 'react-native';

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
        // <ListView dataSource={ this.state.users }
        //           renderRow={ this.renderUser }
        //           style={ listViewStyle } />
        <View style={ dashboardStyle }>
          <Text style={ textStyle }>Welcome</Text>
          <TouchableOpacity
            style={ buttonStyle }
            onPress={() => this.logoutUser()}
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
    backgroundColor: '#F26367',
    height: 15,
    minWidth: 50,
    borderRadius: 5
  },

  dashboardStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  }
});
