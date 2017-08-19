import React from 'react';
import { StyleSheet,
         View,
         FlatList,
         Text,
         TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';

import {createTranscription} from '../../actions/transcription_actions';

class TranscriptionForm extends React.Component {
  constructor(props) {
    super(props);
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
    this.setState({
      transcriptionTitle: newProps.transcriptionTitle,
      description: newProps.description
    });
  }



  addTranscription() {
    let data = {};
    data['title'] = this.state.transcriptionTitle;
    data['description'] = this.state.description;
    // data['audio_url'] = `${this.state.transcriptionTitle}.aac`;
    data['audio_url'] = `${RNFS.DocumentDirectoryPath}`;
    data['usernames'] = this.state.usernames;
    // fetch('http://www.scriber.us/transcriptions/', {
    RNFS.downloadFile({
      fromUrl: `https://s3-us-west-2.amazonaws.com/scriberflexproject/${this.state.transcriptionTitle}.aac`,
      toFile: `${RNFS.DocumentDirectoryPath}/test.mp3`
    }).promise.then((response)=>{
      console.log(response);
      console.log('file downloaded!');
      fetch('http://127.0.0.1:8000/transcriptions/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          // 'Host': 'scriber.us',
          'Host': '127.0.0.1:8000',
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json()).then(
        (newResponse)=>{
          console.log(newResponse);
          Actions.TranscriptionShow({transcriptionPk: newResponse.pk});
        }
      );
    });
  }

  render() {
    const { textInputStyle,
            attendeeNamesStyle,
            attendeeTabStyle,
            attendeeTopStyle,
            formStyle,
            headerStyle,
            recordAudioStyle,
            oneInput,
            transcriptionFormStyle } = styles;
    let usernames = [];
    if(this.state.usernames){
      for(let i = 0; i< this.state.usernames.length; i++){
        if(this.state.usernames[i]){
          usernames.push(this.state.usernames[i]);
        }
      }
    }
    return (
      <View style={ transcriptionFormStyle } >

        <View style={ formStyle }>
          <View style={ oneInput }>
            <TextInput
              style={ textInputStyle }
              label='Title'
              placeholder='Title'
              value={this.state.transcriptionTitle}
              onChangeText={(transcriptionTitle)=>this.setState({transcriptionTitle})}
              />
          </View>
          <View style={ oneInput }>
            <TextInput
              style={ textInputStyle }
              label='Description'
              placeholder='Description'
              value={this.state.description}
              onChangeText={(description)=>this.setState({description})}
            />
          </View>
        </View>

        <View style={ attendeeTabStyle }>
          <View style={ attendeeTopStyle }>
            <Button style={styles.button}
              onPress={() => Actions.Attendees(
                {users: this.props.users, transcriptionTitle: this.state.transcriptionTitle, description: this.state.description, usernames: this.state.usernames}
              )}
              activeOpacity={.8}>
              <View style={styles.addAttendees}>
                <Text style={styles.title}>ADD ATTENDEES</Text>
                <Icon name="chevron-thin-right" size={15} style={styles.icon}/>
              </View>
            </Button>
          </View>

          <View style={ styles.allAttendees }>
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
             style={ styles.recordButton }
             activeOpacity={.8} >
             <Icon2 name="record-rec" size={100} style={{color:'#F26367'}}/>
           </Button>
           <Text style={{alignSelf:'center'}}>Record Audio</Text>
         </View>

         <View>
           <Button
             style={ styles.buttonStyle }
             activeOpacity={.8}
             onPress={() => {
               let users = this.state.usernames.slice();
               users = users.concat(this.props.attendees);
               this.setState({
                 usernames: users
               });
               this.addTranscription();
             }}>
             <Text style={ styles.buttonText }>
             Create Transcription
             </Text>
           </Button>
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
    height: 10,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
    marginTop: 10
  },

  recordButton: {
    borderColor: 'transparent'
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
