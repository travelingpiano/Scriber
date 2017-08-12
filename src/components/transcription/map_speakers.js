import React from 'react';
import { StyleSheet,
         View,
         TouchableHighlight,
         ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

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
  }

  renderSpeakersList() {
    if (this.allSpeakers) {
      console.log(this.allSpeakers);
      return this.allSpeakers.map((speaker, idx) => {
        if (Number.isInteger(speaker)) {
          return (
            <View style={styles.speakerPicker} key={`speaker-${idx}`}>
              <Text style={styles.speaker}>Speaker {speaker}</Text>
            </View>
          );
        } else {
          return (
            <View key={`speaker-${idx}`}>
              <Text style={styles.speaker}>{speaker}</Text>
            </View>
          );
        }
      });
    }
  }

  render() {

    return (
      <View>
        <View style={styles.speakersList}>
          <Text style={styles.title}>Map Speakers</Text>
          {this.renderSpeakersList()}
        </View>

        <MenuContext style={{flex: 1}}>
          <View style={styles.container}>

            <View style={styles.topbar}>
              <Menu name="numbers" renderer={SlideInMenu} onSelect={value => console.log(value)}>
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>Slide-in menu...</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1} text='Option one' />
                  <MenuOption value={2} text='Option two' />
                  <MenuOption value={3} text='Option three' />
                  <MenuOption value={4} text='Option four' />
                  { null /* conditional not rendered option */ }
                  <MenuOption value={5} text='Option five' />
                </MenuOptions>
              </Menu>
              <View style={{flex:1}}></View>
              <Menu name="types" onSelect={value => this.selectOptionType(value)}
                onBackdropPress={() => this.addLog('menu will be closed by backdrop')}
                onOpen={() => this.addLog('menu is opening')}
                onClose={() => this.addLog('menu is closing')}
                >
                <MenuTrigger style={styles.trigger}>
                  <Text style={styles.triggerText}>Context menu...</Text>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value="Normal" text='Normal' />
                  <MenuOption value="Disabled" disabled={true} text='Disabled' />
                  <MenuOption value="Do not close" text='Do not close' />
                  <View style={styles.divider}/>
                  <MenuOption value={{ text: 'Hello world!' }} text='Object as value' />
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </MenuContext>
      </View>
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
