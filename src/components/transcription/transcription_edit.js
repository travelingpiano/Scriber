import React from 'react';
import { StyleSheet,
         View,
         ListView,
         Text,
         TextInput,
         TouchableHighlight,
         ScrollView,
         Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import merge from 'lodash';
import MapSpeakers from './map_speakers';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Entypo';


class TranscriptionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentTranscription;
    this.state['allSpeakers'] = {};

    this.getSpeakerUpdates = this.getSpeakerUpdates.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.newUsernames && this.props.newUsernames !== this.state.usernames) {
      this.setState({
        usernames: this.props.newUsernames
      });
    }
  }

  updateTranscription() {

    let data = {};
    data['title'] = this.state.title;
    data['description'] = this.state.description;
    data['usernames'] = this.state.usernames;
    data['users'] = this.state.allSpeakers;
    data['pk'] = this.state.pk;

    data = JSON.stringify(data);
    this.props.updateTranscription(data);
  }

  getSpeakerUpdates(data) {
    this.setState({allSpeakers: data});
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

  render() {
    const { textInputStyle,
            attendeeTabStyle,
            formStyle,
            recordAudioStyle,
            transcriptionEditStyle } = styles;

    return (
      <View style={ transcriptionEditStyle } >

        <View style={ formStyle }>
          <Text style={styles.title}>TITLE</Text>
          <TextInput
            style={ textInputStyle }
            value={ this.state.title }
            label='Title'
            placeholder='Title'
            onChangeText={ title => this.setState({title})}
            />
        </View>
        <View style={ formStyle }>
          <Text style={styles.title}>DESCRIPTION</Text>
          <TextInput
            style={ textInputStyle }
            label='Description'
            style={{flex: 1}}
            value={ this.state.description }
            placeholder='Description'
            onChangeText={ description => this.setState({description})}
          />
        </View>

        <View style={ attendeeTabStyle }>
          <Button style={styles.button}
            onPress={() => Actions.Attendees({usernames: this.state.usernames})}
            activeOpacity={.8}>
            <View style={styles.editAttendees}>
              <Text style={styles.title}>
                EDIT ATTENDEES
              </Text>
              <Icon name="chevron-thin-right" size={15} style={styles.icon}/>
            </View>
          </Button>
          <View style={styles.allAttendees}>
            {this.renderAttendees(this.state.usernames)}

          </View>
        </View>

        <MapSpeakers style={{flex:.5}} attendees={this.state.usernames}
          transcription={this.state} sendSpeakerUpdates={this.getSpeakerUpdates}/>

          <Button
            onPress={() => this.updateTranscription()}
            style={ styles.updateStyle }
            activeOpacity={.8} >
            <Text style={ styles.updateText }>
              Update Transcription
            </Text>
          </Button>

      </View>
    );
  }
}

export default TranscriptionEdit;

const styles = StyleSheet.create({
  transcriptionEditStyle: {
    flex: 1,
    padding: 10,
  },

  icon: {
    color: 'gray',
    marginTop: 12,
    marginRight: 10,
    alignItems: 'center'
  },

  attendeeTabStyle: {
    flex: .3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: .5,
    borderTopWidth: .5,
    borderColor: 'lightgray',
  },

  allAttendees: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },

  editAttendees: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: .5,
    borderColor: 'lightgray',
  },

  textInputStyle: {
    flex: 1,
    borderBottomWidth: .5,
    borderColor: 'lightgray',
  },

  formStyle: {
    flex: .2,

  },

  container: {
    flex: .5
  },

  buttonStyle: {
    flex: .1,
  },

  button: {
    height: 10,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
    marginTop: 10
  },

  title: {
    color: '#5BCAD3',
    paddingTop: 10
  },

  updateStyle: {
    width: 250,
    backgroundColor: '#F26367',
    borderColor: '#F26367',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  updateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },

});
