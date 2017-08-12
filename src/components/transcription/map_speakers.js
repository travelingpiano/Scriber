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
    console.log(this.props);
    this.state = {
      allSpeakers: this.props.allSpeakers,
      attendees: this.props.attendees
    };
  }

  renderSpeakersList() {
    if (this.state.allSpeakers) {
      console.log(this.state.allSpeakers);
      return this.state.allSpeakers.map((speaker, idx) => {
        if (Number.isInteger(speaker)) {
          return (
            <View style={styles.topbar} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => {
                  let newSpeakers = JSON.parse(JSON.stringify(this.state.allSpeakers));
                  newSpeakers[idx] = value;
                  console.log(newSpeakers);
                  this.setState({allSpeakers: newSpeakers});
                }}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>Speaker {speaker}</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1} text='Option one' />
                  <MenuOption value={2} text='Option two' />
                  { null /* conditional not rendered option */ }
                  <MenuOption value={5} text='Option five' />
                </MenuOptions>
              </Menu>
            </View>
          );
        } else {
          return (
            <View style={styles.topbar} key={`speaker-${idx}`}>
              <Menu name={`speaker-${idx}`} renderer={SlideInMenu} onSelect={value => {
                  let newSpeakers = merge({},this.state.allSpeakers);
                  newSpeakers[idx] = value;
                  this.setState({allSpeakers: newSpeakers});
                }}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>{speaker}</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1} text='Option one' />
                  <MenuOption value={2} text='Option two' />
                  { null /* conditional not rendered option */ }
                  <MenuOption value={5} text='Option five' />
                </MenuOptions>
              </Menu>
            </View>
          );
        }
      });
    }
  }

  render() {

    return (
        <MenuContext style={{flex: 1}}>
          {this.renderSpeakersList()}
        </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  speakersList: {
    flex: .3,
  },

  speakerPicker: {
    // flex: 1,
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
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },

});


export default MapSpeakers;
