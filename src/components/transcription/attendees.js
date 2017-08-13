import React from 'react';
import { StyleSheet,
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
    this.state = {
      users: [],
      attendees: [],
      icons: [],
      dataChange: true
    };

    this.toggleAttendee = this.toggleAttendee.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  componentWillMount() {
    this.props.getUsers().then(({users})=>{
      console.log(users.length);
      let iconList = [];
      for(let i = 0; i<users.length; i++){
        users[i]['icon'] = plusIcon;
        iconList.push('plus');
      }
      console.log(iconList);
      this.setState({users,icons: iconList});
    });
  }

  componentReceiveProps() {
    // this.props.getUsers();
  }

  componentDidUpdate() {
  }

  toggleAttendee(icons, index) {
    let usernames = this.state.attendees.slice();
    let username = this.state.users[index]['username'];
    if (this.state.attendees.includes(username)) {
      console.log('Leave!');
      let userIndex = this.state.attendees.indexOf(username);
      usernames.splice(userIndex, 1);
    } else if (!(this.state.attendees.includes(username))) {
      console.log('Enter!');
      usernames = usernames.concat(username);
    }
    let users = this.toggleIcon(this.state.users,index);
    this.setState({
      attendees: usernames,
      users
    });
  }

  toggleIcon(users,index) {
    console.log(index);
    let icons = this.state.icons;
    if(icons[index]==='check'){
      users[index]['icon'] = plusIcon;
      icons[index] = 'plus';
    }else{
      users[index]['icon'] = checkIcon;
      icons[index] = 'check';
    }
    this.setState({icons, dataChange: !this.state.dataChange});
    return users;
  }

  render() {
    console.log('USERS', this.state.users);
    console.log('In MEETING',this.state.attendees);
    console.log('ICONS',this.state.icons);
    let icons = [];
    if(this.state.icons.length==this.props.users.length){
      icons = this.state.icons;
    }else if(this.props.users){
      for(let i = 0; i<this.props.users.length; i++){
        icons.push('plus');
      }
    }
    if(this.props.users){
      // console.log(icons[0]);
      return (
        <View style={styles.containerStyle}>
          <FlatList
            data={this.state.icons} extraData={this.state.dataChange}
            keyExtractor={(item,index) => index}
            renderItem={({ item, index }) =>
            <View style={styles.listItemStyle}>
              <Text style={styles.userStyle}>{this.state.users[index]['username']}</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.toggleAttendee(item, index);
                }}
                style={ styles.iconStyle }>
                {this.state.users[index]['icon']}
              </TouchableWithoutFeedback>
            </View>}
          />
          <Button
            onPress={() => {
              Actions.TranscriptionForm({attendees: this.state.attendees});
            }}
            title="Add Attendees"
          />
        </View>
      );
    }else{
      return (
        <View style={styles.containerStyle}></View>
      );
    }
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
