import React from 'react';
import { StyleSheet,
         ListView,
         ScrollView,
<<<<<<< HEAD
<<<<<<< HEAD
         View,
         FlatList,
=======
>>>>>>> users props passed properly
=======
         View,
         FlatList,
>>>>>>> render usernames
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
<<<<<<< HEAD
<<<<<<< HEAD
    };
=======
      users: this.props.getUsers(),
    };
    console.log('NEW state', this.state);
>>>>>>> dispatch props to attendees
=======
    };
>>>>>>> users props passed properly
  }

  componentWillMount() {
    // this.createDataSource(this.props);
<<<<<<< HEAD
<<<<<<< HEAD
    this.props.getUsers();
  }

<<<<<<< HEAD
=======
=======
  }


>>>>>>> dispatch props to attendees
  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
>>>>>>> move connect function to tranc form

  // createDataSource({ users }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //
  //   this.dataSource = ds.cloneWithRows(users);
  // }

=======
    this.props.getUsers();
  }


  // createDataSource({ users }) {
  //   const ds = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //
  //   this.dataSource = ds.cloneWithRows(users);
  // }

>>>>>>> users props passed properly
  // renderRow(user) {
  //   return
  // }

  render() {
    console.log(this.props.users);
    return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> render usernames
      <View style={styles.containerStyle}>
        <FlatList
          data={this.props.users}
          keyExtractor={item => item.pk}
          renderItem={({ item }) => <Text style={styles.userStyle}>{item.username}</Text>}
        />
      </View>
<<<<<<< HEAD
<<<<<<< HEAD

=======
      // <ListView
      //   enableEmptySections
      //   dataSource={ this.dataSource }
      //   renderRow={ this.renderRow }
      // />
      <Text>Attendees List</Text>
>>>>>>> dispatch props to attendees
=======

      <Text>{this.props.users[0].username}</Text>
>>>>>>> users props passed properly
=======
        // <Text>{this.props.users[0].username}</Text>

=======
>>>>>>> prep to checkout master

>>>>>>> render usernames
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> render usernames
    flexDirection: 'column',
  },

  userStyle: {
    flex: 1,
    width: "85%",
    padding: 10,
<<<<<<< HEAD
  }
});

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(requestUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
=======
=======
>>>>>>> render usernames
  }
});

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(requestUsers()),
});

<<<<<<< HEAD
export default connect(null, mapDispatchToProps)(Attendees);
>>>>>>> dispatch props to attendees
=======
export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
>>>>>>> users props passed properly
