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
      allSpeakers: [],
      allSnippets: null,
    };
    console.log(this.props);
  }

  componentWillMount() {
    this.renderTranscriptionSnippets();
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

  updateSpeaker(value,idx) {
    let newSpeakers = JSON.parse(JSON.stringify(this.state.allSpeakers));
    newSpeakers[idx] = value;
    this.setState({allSpeakers: newSpeakers});
  }

  renderSpeakersList() {
    if (this.state.allSpeakers) {
      console.log(this.state.allSpeakers);
      return this.state.allSpeakers.map((speaker, idx) => {
        if (Number.isInteger(speaker)) {
          return (
            <View style={styles.topbar} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,idx)}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>Speaker {speaker}</Text>
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
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => this.updateSpeaker(value,idx)}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>{speaker}</Text>
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
    if (!this.state.allSpeakers.includes(JSON.parse(snippet).speaker)) {
      this.state.allSpeakers.push(JSON.parse(snippet).speaker);
    }
    if (JSON.parse(snippet).speaker === this.state.currentSpeaker) {
      return null;
    } else {
      this.state.currentSpeaker = JSON.parse(snippet).speaker;
      return (
        <Text style={styles.speaker}>Speaker: {JSON.parse(snippet).speaker}</Text>
      );
    }
  }

  render() {

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
