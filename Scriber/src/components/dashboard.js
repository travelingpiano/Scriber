import React from 'react';
import { Text,
         StyleSheet,
         ListView,
         View } from 'react-native';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { textStyle, listViewStyle } = styles;
    // if (this.state.token) {
      return (
        // <ListView dataSource={ this.state.users }
        //           renderRow={ this.renderUser }
        //           style={ listViewStyle } />
        <Text>Welcome</Text>
              );
    // }
  }

  renderUser(user) {
    return(
      <View style={styles.list}>
        <Text>{user.name}</Text>
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
});
