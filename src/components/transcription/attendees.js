import React from 'react';
import { StyleSheet,
         ListView,
         ScrollView,
         View,
         FlatList,
         Button,
         Text,
         TouchableWithoutFeedback,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { requestUsers } from '../../actions/users_actions';


class Attendees extends React.Component {
  constructor(props) {
    super(props);
    // console.log('ATTENDEE', this.props);
    this.attendees = [];
  }

  componentWillMount() {
    this.props.getUsers();
  }

  toggleAddAttendee(username) {
    if (this.attendees.includes(username)) {
      // console.log('Hit Me');
      // this.attendees.push(username);
      console.log(this.attendees);
      return checkIcon;
    } else if (!(this.attendees.includes(username))) {
      console.log('LEAVING!');
      // this.attendees.splice(this.attendees.indexOf(username), 1);
      return plusIcon;
    }
  }

  render() {
    console.log('USERS', this.props.users);
    console.log(this.attendees);
    return (
      <View style={styles.containerStyle}>
        <FlatList
          data={this.props.users}
          keyExtractor={item => item.pk}
          renderItem={({ item }) =>
          <View style={styles.listItemStyle}>
            <Text style={styles.userStyle}>{item.username}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log('click Plus');
                this.attendees.push(item.username);
                this.toggleAddAttendee(item.username);
              } }
              style={ styles.iconStyle }>
              {this.toggleAddAttendee(item.username)}
            </TouchableWithoutFeedback>
          </View>}
        />
        <Button
          onPress={() => {
            this.setState();
            Actions.TranscriptionForm();
          }}
          title="Add Attendees"
        />
      </View>
    );
  }
}

const plusIcon = (<Icon name="plus-circle" size={30} color="#F00" />);
const checkIcon = (<Icon name="check-circle" size={30} color="#32CD32" />);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  userStyle: {
    flex: 1,
    width: "85%",
    padding: 5,
    fontWeight: 'bold',
  },

  listItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 35,
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },

  iconStyle: {
    width: 30,
  }
});

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(requestUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
