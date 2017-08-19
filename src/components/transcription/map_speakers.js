import React from 'react';
import { StyleSheet,
         View,
         ScrollView,
         Button,
         Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import Icon from 'react-native-vector-icons/Entypo';

import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

class MapSpeakers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attendees: this.props.attendees,
      allSpeakers: {},
      allSnippets: null,
    };

    // a hash of all the speakers that's initially created, same as the initial allSpeakers hash
    this.speakers = {};
    this.currentSpeaker = null;

    this.updateSpeaker = this.updateSpeaker.bind(this);
    this.renderTranscriptionSnippets = this.renderTranscriptionSnippets.bind(this);
  }

  componentWillMount() {
    this.createInitialSpeakers();
    this.renderTranscriptionSnippets();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.allSpeakers) !== JSON.stringify(this.state.allSpeakers)) {
      this.renderTranscriptionSnippets();
      this.props.sendSpeakerUpdates(this.state.allSpeakers);
    }
  }

  // create the initial allSpeakers hash in the state
  createInitialSpeakers() {
    let transSnippets = this.props.transcription.transcription;
    transSnippets.forEach((snippet) => {
      if (!Object.keys(this.speakers).includes(JSON.parse(snippet).speaker)) {
        this.speakers[JSON.parse(snippet).speaker] = JSON.parse(snippet).speaker;
      }
    });
    this.setState({allSpeakers: this.speakers});
  }

  renderAttendeesOptions() {
    return this.state.attendees.map(attendee => {
      return (
        <MenuOption key={`${attendee}`} value={`${attendee}`} text={`${attendee}`} />
      );
    });
  }

  renderTime(createdTime, time) {
    return (
      <Text style={styles.time}>{this.props.parseTime(createdTime)}</Text>
    );
  }

  updateSpeaker(value,key) {
    let newSpeakers = Object.assign({}, this.state.allSpeakers);
    newSpeakers[key] = value;
    this.setState({allSpeakers: newSpeakers});
  }

  // renders the list of speakers and attendees that show up in the pop-up menu to map speakers to attendees
  renderSpeakersList() {

    if (Object.keys(this.state.allSpeakers).length !== Object.keys(this.speakers).length) {
      // if the allSpeakers hash in state is not yet created, iterate through the speakers hash
      return Object.keys(this.speakers).map((key, idx) => {
        return (
          <View style={styles.speakerDropdown} key={`speaker-${idx}`}>
            <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,key)}>
              <MenuTrigger style={styles.trigger}>
                <View style={styles.viewTrigger}>
                  <Icon name="chevron-thin-down" size={15} color={'white'} style={styles.icon}/>
                  <Text style={styles.triggerText}>Speaker {this.speakers[key]}</Text>
                </View>
              </MenuTrigger>
              <MenuOptions>
                {this.renderAttendeesOptions()}
              </MenuOptions>
            </Menu>
          </View>
        );
      });
    } else {
      // if the allSpeakers hash has been create, iterate through that
      return Object.keys(this.state.allSpeakers).map((key, idx) => {
        if (Number.isInteger(this.state.allSpeakers[key])) {
          return (
            <View style={styles.speakerDropdown} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,key)}>
                <MenuTrigger style={styles.trigger}>
                  <View style={styles.triggerView}>
                    <Icon name="chevron-thin-down" size={15} color={'white'} style={styles.icon}/>
                    <Text style={styles.triggerText}>Speaker {this.state.allSpeakers[key]}</Text>
                  </View>
              </MenuTrigger>
                <MenuOptions>
                  {this.renderAttendeesOptions()}
                </MenuOptions>
              </Menu>
            </View>
          );
        } else {
          return (
            <View style={styles.speakerDropdown} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,key)}>
                <MenuTrigger style={styles.trigger}>
                  <View style={styles.triggerView}>
                    <Icon name="chevron-thin-down" size={15} color={'white'} style={styles.icon}/>
                    <Text style={styles.triggerText}>{this.state.allSpeakers[key]}</Text>
                  </View>
                </MenuTrigger>
                <MenuOptions>
                  {this.renderAttendeesOptions()}
                </MenuOptions>
              </Menu>
            </View>
          );
        }
      });
    }
  }

  renderTranscriptionSnippets() {
    if (this.props.transcription) {
      let { transcription, createdTime } = this.props;
      this.currentSpeaker = null;
      let newSnippets = transcription.transcription.map((snippet,idx) => {
        return (
          <View style={styles.eachSnippet} key={`snippet-${idx}`}>
            {this.renderSpeaker(snippet)}
            <Text style={styles.timeStamps}>{JSON.parse(snippet).timestamps[0]}</Text>
            <Text style={styles.snippetText}>{JSON.parse(snippet).text}</Text>
          </View>
        );
      });
      this.setState({allSnippets: newSnippets});
    }
  }

  renderSpeaker(snippet) {
    let snippetSpeaker = JSON.parse(snippet).speaker;

    // if allSpeakers is not yet set in state, then just use snippetSpeaker as the speaker name
    if ((Object.keys(this.state.allSpeakers).length) === 0) {
      if (snippetSpeaker === this.currentSpeaker) {
        return (
          null
        );
      } else {
        this.currentSpeaker = snippetSpeaker;
        return (
          <Text style={styles.speaker}>Speaker: {snippetSpeaker}</Text>
        );
      }
    } else {
      if (this.state.allSpeakers[snippetSpeaker] === this.currentSpeaker) {
        return (
          null
        );
      } else {
        this.currentSpeaker = this.state.allSpeakers[snippetSpeaker];
        if (this.state.allSpeakers[snippetSpeaker]) {
          return (
            <Text style={styles.speaker}>Speaker: {this.state.allSpeakers[snippetSpeaker]}</Text>
          );
        } else {
          return (
            <Text style={styles.speaker}>Speaker: {snippetSpeaker}</Text>
          );
        }
      }
    }
  }

  render() {
    return (
        <MenuContext style={{flex: 1}}>
          <Text style={styles.title}>MAP SPEAKERS</Text>
            <View style={{paddingTop: 10}}>
              {this.renderSpeakersList()}
            </View>
          <Text style={styles.previewTitle}>TRANSCRIPTION PREVIEW</Text>
          <ScrollView style={styles.snippets} >
            {this.state.allSnippets}
          </ScrollView>
        </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  speakersList: {
    flex: .3,
  },

  icon: {
    paddingRight: 10
  },

  title: {
    color: '#5BCAD3',
    paddingTop: 10
  },

  previewTitle: {
    color: '#5BCAD3',
    paddingTop: 20,
    borderTopWidth: .5,
    borderColor: 'lightgray',
  },

  speakerDropdown: {
    flexDirection: 'row',
    backgroundColor: '#5BCAD3',
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    margin: 2,
  },

  triggerView: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },

  trigger: {
    padding: 2,
    margin: 2,
    height: 20
  },

  triggerText: {
    color: 'white',
    minWidth: 30
  },

  speaker: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  timeStamps: {
    textAlign: 'right',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
  },

  snippetText: {
    fontSize: 12,
  },

  snippets: {
    height: 15,
  },

  eachSnippet: {
    paddingLeft: 15,
    paddingRight: 15
  },

  time: {
    flex: .2,
    justifyContent: 'center',
    padding: 10
  },

});

export default MapSpeakers;
