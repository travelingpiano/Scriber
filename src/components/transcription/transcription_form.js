import React from 'react';
import { StyleSheet,
         View,
         FlatList,
         Button,
         Text,
         TextInput,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import {createTranscription} from '../../actions/transcription_actions';

class TranscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('form props', this.props);
    this.state = {
      transcriptionTitle:'',
      transcription: '',
      description: '',
      audio_url:'',
      usernames: ''
    };

    this.createTranscription = this.props.createTranscription.bind(this);
    this.addTranscription = this.addTranscription.bind(this);
  }

  componentDidMount(){
    this.setState({
      transcriptionTitle: this.props.transcriptionTitle,
      description: this.props.description,
      usernames: this.props.usernames
    });
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    this.setState({
      transcriptionTitle: newProps.transcriptionTitle,
      description: newProps.description
    });
  }



  addTranscription() {
    let data = {};
    data['title'] = this.state.transcriptionTitle;
    data['description'] = this.state.description;
    data['audio_url'] = `${this.state.transcriptionTitle}.aac`;
    data['usernames'] = this.state.usernames;
    fetch('http://127.0.0.1:8000/transcriptions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': '127.0.0.1:8000',
      },
      body: JSON.stringify(data)
    }).then(
      ()=>{
        console.log(data);
        setTimeout(
          ()=>{Actions.TranscriptionIndex({create: true});},5000
        );
      }
    );
  }

  render() {
    const { textInputStyle,
            attendeeNamesStyle,
            attendeeTabStyle,
            attendeeTopStyle,
            formStyle,
            headerStyle,
            recordAudioStyle,
            transcriptionFormStyle } = styles;
    let usernames = [];
    // console.log(this.state);
    if(this.state.usernames){
      for(let i = 0; i< this.state.usernames.length; i++){
        if(this.state.usernames[i]){
          usernames.push(this.state.usernames[i]);
        }
      }
    }
    return (
      <View style={ transcriptionFormStyle } >
        <View style={ headerStyle }>
          <Text>
            New Transcription
          </Text>
        </View>

        <View style={ formStyle }>
          <TextInput
            style={ textInputStyle }
            label='Title'
            placeholder='Title'
            value={this.state.transcriptionTitle}
            onChangeText={(transcriptionTitle)=>this.setState({transcriptionTitle})}
            />
          <TextInput
            style={ textInputStyle }
            label='Description'
            placeholder='Description'
            value={this.state.description}
            onChangeText={(description)=>this.setState({description})}
          />
        </View>

        <View style={ attendeeTabStyle }>
          <View style={ attendeeTopStyle }>
            <Text>
              Attendees
            </Text>

            <Button
              onPress={() => Actions.Attendees({transcriptionTitle: this.state.transcriptionTitle, description: this.state.description})}
              title='Add Attendees'
              />
          </View>

          <View style={ attendeeNamesStyle }>
            <FlatList
              data={usernames}
              keyExtractor={item => item}
              renderItem={({ item }) =>
              <Text>{item}</Text>
            }
            />
          </View>
      </View>

        <View style={ recordAudioStyle }>
          <Button
            onPress={() => Actions.RecordAudio({users: this.props.users, transcriptionTitle: this.state.transcriptionTitle, description: this.state.description, usernames: this.state.usernames})}
            title="Record Audio"
          />
        </View>

        <View>
          <Button
            onPress={() => {
              let users = this.state.usernames.slice();
              users = users.concat(this.props.attendees);
              this.setState({
                usernames: users
              });
              console.log('adding', this.state.usernames);
              this.addTranscription();
            }}
            title="Create Transcription"
            />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  transcriptionFormStyle: {
    flex: 1,
  },

  allAttendees: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },

  oneInput: {
    paddingTop: 10,
    alignSelf: 'stretch'
  },

  icon: {
    color: 'gray',
    marginTop: 12,
    marginRight: 10,
    alignItems: 'center'
  },

  addAttendees: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  button: {
    borderColor: 'transparent',
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

  title: {
    color: '#5BCAD3',
    paddingTop: 10
  },

  attendeeTabStyle: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 50,
    padding: 10
  },

  attendeeTopStyle: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerStyle: {
    flex: 1,
  },

  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    alignSelf: 'stretch',
    borderBottomWidth: .5,
    borderColor: 'lightgray',
  },

  formStyle: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flex: .2,
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },

  recordAudioStyle: {
    flex: .5
  },
});


const mapDispatchToProps = (dispatch) => ({
  createTranscription: data => dispatch(createTranscription(data)),
});

export default connect(null, mapDispatchToProps)(TranscriptionForm);
