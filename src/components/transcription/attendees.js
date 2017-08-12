import React from 'react';
import { StyleSheet,
         ListView,
         ScrollView,
         View,
         FlatList,
         Button,
         Text,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import { requestUsers } from '../../actions/users_actions';
// import { selectAllUsers } from '../../reducers/selectors';

class Attendees extends React.Component {
  constructor(props) {
    super(props);
    console.log('ATTENDEE', this.props);
    this.state = {
      users: this.props.getUsers(),
    };
    console.log('NEW state', this.state);
  }

  componentWillMount() {
    // this.createDataSource(this.props);

    this.props.getUsers();
  }

  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

  // createDataSource({ users }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //
  //   this.dataSource = ds.cloneWithRows(users);
  // }

    this.props.getUsers();
  }


  // createDataSource({ users }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //
  //   this.dataSource = ds.cloneWithRows(users);
  // }
  // renderRow(user) {
  //   return
  // }

  render() {
    console.log(this.props.users);
    return (

      <View style={styles.containerStyle}>
        <FlatList
          data={this.props.users}
          keyExtractor={item => item.pk}
          renderItem={({ item }) => <Text style={styles.userStyle}>{item.username}</Text>}
        />
      </View>

      // <ListView
      //   enableEmptySections
      //   dataSource={ this.dataSource }
      //   renderRow={ this.renderRow }
      // />
      // <Text>Attendees List</Text>
      //
      //
      // <Text>{this.props.users[0].username}</Text>

        // <Text>{this.props.users[0].username}</Text>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,

    flexDirection: 'column',
  },

  userStyle: {
    flex: 1,
    width: "85%",
    padding: 10,
  }
});

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(requestUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);