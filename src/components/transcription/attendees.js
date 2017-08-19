import React from 'react';
import { StyleSheet,
         View,
         FlatList,
         Text,
         TouchableWithoutFeedback,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchTranscription }
  from '../../actions/transcription_actions';
import Button from 'apsl-react-native-button';

import { requestUsers } from '../../actions/users_actions';


class Attendees extends React.Component {
  constructor(props) {
    super(props);
    let initAttendees = [];
    if (this.props.transcriptionUsers) {
      initAttendees = this.props.transcriptionUsers;
    }

    this.state = {
      users: [],
      attendees: initAttendees,
      icons: [],
      dataChange: true
    };

    this.toggleAttendee = this.toggleAttendee.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  componentWillMount() {
    if (this.props.currentTranscription) {
      this.props.fetchTranscription(this.props.currentTranscription.pk);
    }
    this.props.getUsers().then(({users}) => {
        let iconList = [];
        for(let i = 0; i<users.length; i++){
          if (this.props.transcriptionUsers) {
            if (this.props.transcriptionUsers.includes(users[i].username)) {
              users[i]['icon'] = checkIcon;
              iconList.push('check');
            } else {
              users[i]['icon'] = plusIcon;
              iconList.push('plus');
            }
          } else {
            users[i]['icon'] = plusIcon;
            iconList.push('plus');
          }
        }
        this.setState({users,icons: iconList});
      }
    );
  }

  toggleAttendee(icons, index) {
    let usernames = this.state.attendees.slice();
    let username = this.state.users[index]['username'];
    if (this.state.attendees.includes(username)) {
      let userIndex = this.state.attendees.indexOf(username);
      usernames.splice(userIndex, 1);
    } else if (!(this.state.attendees.includes(username))) {
      usernames = usernames.concat(username);
    }
    let users = this.toggleIcon(this.state.users,index);
    this.setState({
      attendees: usernames,
      users
    });
  }

  toggleIcon(users,index) {
    let icons = this.state.icons;
    if(icons[index]==='check'){
      users[index]['icon'] = plusIcon;
      icons[index] = 'plus';
    } else {
      users[index]['icon'] = checkIcon;
      icons[index] = 'check';
    }
    this.setState({icons, dataChange: !this.state.dataChange});
    return users;
  }

  render() {
    let icons = [];
    if (this.state.icons.length == this.props.users.length){
      icons = this.state.icons;
    } else if(this.props.users){
      for(let i = 0; i<this.props.users.length; i++){
        icons.push('plus');
      }
    }
    if(this.props.users){
      
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
            style={ styles.buttonStyle }
            activeOpacity={.8}
            onPress={() => {
              if (this.props.edit) {
                Actions.TranscriptionEdit({newUsernames:this.state.attendees});
              } else {
                Actions.TranscriptionForm({usernames: this.state.attendees, transcriptionTitle: this.props.transcriptionTitle, description: this.props.description});
              }
            }}>
            <Text style={ styles.buttonText }>
              {(this.props.transcriptionUsers) ? 'Update Attendees' : 'Add Attendees'}
            </Text>
          </Button>
        </View>
      );
    }else{
      return (
        <View style={styles.containerStyle}></View>
      );
    }
  }
}

const plusIcon = (<Icon name="plus-circle" size={30} color="#F26367" />);
const checkIcon = (<Icon name="check-circle" size={30} color="#71CD71" />);

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
    borderBottomWidth: .5,
  },

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

  iconStyle: {
    width: 30,
  }
});

const mapStateToProps = (state, ownProps) => {
  let attendees = [];
  if (state.transcriptions.currentTranscription) {
    attendees = ownProps.usernames;
  }

  return {
  users: state.users.users,
  currentTranscription: state.transcriptions.currentTranscription,
  transcriptionUsers: attendees
  };
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(requestUsers()),
  fetchTranscription: id => dispatch(fetchTranscription(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
