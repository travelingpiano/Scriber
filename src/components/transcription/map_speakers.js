import React from 'react';
import { StyleSheet,
         View,
         TouchableHighlight,
         ScrollView,
         Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { merge } from 'lodash';

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
      currentSpeaker: null,
      allSpeakers: {},
      allSnippets: null,
    };

    this.updateSpeaker = this.updateSpeaker.bind(this);
    this.renderTranscriptionSnippets = this.renderTranscriptionSnippets.bind(this);
  }

  componentWillMount() {
    this.renderTranscriptionSnippets();
    console.log(this.state);
  }

  // componentDidUpdate(nextProps) {
  //   console.log(this.state);
  //   this.renderTranscriptionSnippets();
  // }

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
    // Object.keys(this.state.allSpeakers).forEach((k) => {
    //   if (k === key) {
    //     newSpeakers[key] = value;
    //   } else {
    //     newSpeakers[key] = this.state.allSpeakers[key];
    //   }
    // })
    newSpeakers[key] = value;
    console.log(newSpeakers);
    this.setState({allSpeakers: newSpeakers, currentSpeaker: null});
    console.log(newSpeakers);
    console.log(this.state);
    console.log(this.state.allSpeakers);
    this.renderTranscriptionSnippets();
  }

  // renders the list of speakers and attendees that show up in the pop-up menu to map speakers to attendees
  renderSpeakersList() {
    if (this.state.allSpeakers) {
      return Object.keys(this.state.allSpeakers).map((key, idx) => {
        if (Number.isInteger(this.state.allSpeakers[key])) {
          return (
            <View style={styles.topbar} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,key)}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>Speaker {this.state.allSpeakers[key]}</Text>
                </MenuTrigger>
                <MenuOptions>
                  {this.renderAttendeesOptions()}
                </MenuOptions>
              </Menu>
            </View>
          );
        } else {
          return (
            <View style={styles.topbar} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,key)}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>{this.state.allSpeakers[key]}</Text>
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
    console.log(this.state);
    if (this.props.transcription) {
      let { transcription, createdTime } = this.props;
      let newSnippets = transcription.transcription.map((snippet,idx) => {
        return (
          <View key={`snippet-${idx}`}>
            {this.renderSpeaker(snippet)}
            <Text style={styles.timeStamps}>{JSON.parse(snippet).timestamps[0]}</Text>
            <Text>{JSON.parse(snippet).text}</Text>
          </View>
        );
      });
      this.setState({allSnippets: newSnippets});
    }
  }

  renderSpeaker(snippet) {
    console.log(this.state);
    let snippetSpeaker = JSON.parse(snippet).speaker;
    if (!Object.keys(this.state.allSpeakers).includes(snippetSpeaker)) {
      let newSpeakers = Object.assign({},this.state.allSpeakers);
      newSpeakers[snippetSpeaker] = snippetSpeaker;
      this.setState({allSpeakers: newSpeakers});
    }
    if (this.state.allSpeakers[snippetSpeaker] === this.state.currentSpeaker) {
      return (
      <Text style={styles.speaker}>Speaker: {this.state.currentSpeaker}</Text>
      );
    } else {
      this.setState({currentSpeaker: this.state.allSpeakers[snippetSpeaker]});
      return (
        <Text style={styles.speaker}>Speaker: {this.state.currentSpeaker}</Text>
      );
    }
  }

  render() {
    console.log('rendering');
    return (
        <MenuContext style={{flex: 1}}>
          <Text>Map Speakers</Text>
          {this.renderSpeakersList()}

          <ScrollView style={styles.snippets}>
            <Text style={styles.title}>Transcription</Text>
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

  speakerPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop : 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  speaker: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  timeStamps: {
    textAlign: 'right',
    paddingTop: 10,
    paddingBottom: 10,
  },

  snippets: {
    height: 20,
  },

  snippet: {
    padding: 10
  },

  time: {
    flex: .2,
    justifyContent: 'center',
    padding: 10
  },

});

export default MapSpeakers;
