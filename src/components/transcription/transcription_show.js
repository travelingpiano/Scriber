import merge from 'lodash';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import FullTranscription from './full_transcription';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TranscriptionShow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.getUser()
    };

  }

  componentWillMount() {
    // console.log(this.props);

    let hi = this.getUser();
    // console.log(hi);

    if (this.props.transcriptionPk) {
      this.props.fetchTranscription(this.props.transcriptionPk);
    } else {
      this.props.fetchTranscription(this.props.currentTranscription.pk);
    }
  }

  getUser() {
    // AsyncStorage.getItem('username').then(result => this.setState({currentUser: result}));
    AsyncStorage.getItem('username').then(result => {
      this.setState({currentUser: result});
    });
  //   this.setState({currentUser: result});
  //   console.log(this.state);
  }

  parseTime(theTime) {
    if (theTime) {
      let parsed = '';
      let timeArr = theTime.split(':');
      let hours = parseInt(timeArr[0]);
      let timeRange = 'AM';
      if (hours === 12) {
        timeRange = 'PM';
      }
      if (hours > 12) {
        timeRange = 'PM';
        hours = hours-12;
      }
      hours = hours.toString();
      parsed = hours+":"+timeArr[1]+' '+timeRange;
      return parsed;
    } else {
      return null;
    }
  }

  submitDelete(){
    fetch(`http://127.0.0.1:8000/transcriptions/${this.props.currentTranscription.pk}`, { // adjust to actual site url
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Origin': '',
          'Host': '127.0.0.1:8000',
        }
      }).then(
      ()=>{
        Actions.TranscriptionIndex();
      }
    );
  }

  renderAttendees(attendees) {
    if (attendees) {
      return(
        <ScrollView containerStyle={{marginBottom:20}}>
          {
            attendees.map((attendee, i) => (
              <Text
                key={i}
                title={attendee}>{attendee}
              </Text>
            ))
          }
        </ScrollView>
      );
    }
  }

  renderDelete() {
    if (this.props.currentTranscription && this.props.currentTranscription.usernames) {
      if (this.props.currentTranscription.usernames[0] === this.state.currentUser) {
        return (
          <Button
            onPress={ () => {
              this.submitDelete();
            }}
            style={ styles.buttonStyle }
            activeOpacity={.8} >
            <Icon name="delete" size={20} style={styles.icon}/>

          </Button>
        );
      }
    }
  }

  render() {
    // console.log(this.state);
    if (this.props.currentTranscription) {
      let transcription = this.props.currentTranscription;
      let parsedTime = this.parseTime(transcription.created_time);
      return (
        <ScrollView style={styles.header}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{transcription.title}</Text>
            {this.renderDelete()}
          </View>
            <View style={styles.additional}>
              <View style={styles.eachInfo}>
                <Text style={styles.description}>{transcription.description}</Text>
              </View>
              <View style={styles.eachInfo}>
                <Text style={styles.textType}>DATE</Text>
                <Text style={{fontSize: 15}}>{transcription.created_date}</Text>
              </View>
              <View style={styles.eachInfo}>
                <Text style={styles.textType}>TIME</Text>
                <Text style={{fontSize: 15}}>{parsedTime}</Text>
              </View>
              <View style={styles.attendeesList}>
                <Text style={styles.textType}>ATTENDEES</Text>
                {this.renderAttendees(transcription.usernames)}
              </View>
            </View>
            <View style={styles.transcription}>
              <FullTranscription transcription={transcription.transcription}
                createdTime={transcription.created_time} parseTime={this.parseTime}/>
            </View>
          </ScrollView>
      );
    }
  }
}

export default TranscriptionShow;

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },

  description: {
    fontSize: 15,
    paddingBottom: 10,
    borderBottomWidth: .5,
    borderColor: 'lightgray',
  },

  titleView: {
    backgroundColor: '#5BCAD3',
    flex: .2,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textType: {
    color: 'gray',
  },

  title: {
    fontSize: 30,
    textAlignVertical: 'center',
    color: 'white',
  },

  additional: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: .5
  },

  eachInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    borderBottomWidth: .5,
    borderColor: 'lightgray',
    paddingTop: 10
  },

  attendeesList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: .5,
    borderColor: 'lightgray',
  },

  transcription: {
    flex: .6,
    paddingTop: 10
  },

  buttonStyle: {
    width: 50,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingTop: 50
  },

  icon: {
    color: 'white',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

});
