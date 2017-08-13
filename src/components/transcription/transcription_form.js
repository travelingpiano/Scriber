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
    console.log(this.props);
    this.setState({
      transcriptionTitle: this.props.transcriptionTitle,
      description: this.props.description,
      usernames: this.props.usernames
    });
  }

  componentDidUpdate(){
    console.log('didupdate');
  }


  componentWillReceiveProps(newProps){
    console.log(newProps);
    this.setState({
      transcriptionTitle: newProps.transcriptionTitle,
      description: newProps.description
    });
  }



  addTranscription() {
    // let data = new FormData();
    // data.append('title', this.state.transcriptionTitle);
    // data.append('transcription', this.state.transcription);
    // data.append('description', this.state.description);
    // data.append('audio_url', `${this.state.transcriptionTitle}.aac`);
    // data.append('usernames', this.state.usernames);
    let data = {};
    data['title'] = this.state.transcriptionTitle;
    data['description'] = this.state.description;
    data['audio_url'] = `${this.state.transcriptionTitle}.aac`;
    data['usernames'] = this.state.usernames;
    console.log(data);
    // if(this.props.recorded){
    // this.props.createTranscription(data)
    //   .then(()=>Actions.TranscriptionIndex());
    // // }
    fetch('http://127.0.0.1:8000/transcriptions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': '127.0.0.1'
      },
      body: JSON.stringify(data)
    }).then(()=>Actions.TranscriptionIndex());
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
            <Text>
              PLACEHOLDer
            </Text>
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
// got to a new page with list of attendees to choose from to pick attendees



// <FlatList
//   data={this.state.usernames}
//   keyExtractor={item => item}
//   renderItem={({ item }) =>
//   <Text>{item}</Text>
// }
// />


const styles = StyleSheet.create({
  transcriptionFormStyle: {
    flex: 1,
  },

  attendeeNamesStyle: {
    flexDirection: 'row',
  },

  attendeeTabStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  attendeeTopStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerStyle: {
    flex: 1,
  },

  textInputStyle: {
    flex: 1,
  },

  formStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C6F1E4'
  },

  recordAudioStyle: {
    flex: 1
  },
});


const mapDispatchToProps = (dispatch) => ({
  createTranscription: data => dispatch(createTranscription(data)),
});

export default connect(null, mapDispatchToProps)(TranscriptionForm);
