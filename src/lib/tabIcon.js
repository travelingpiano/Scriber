import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  if (props.title === 'Transcriptions') {
    return (
      <View>
        <Icon2 name="feather" size={20} style={styles.icon}/>
        <Text
        style={{fontSize: 12, color: props.focused ? '#F26367' : 'gray'}}>{props.title}</Text>
      </View>
    );
  } else if (props.title === 'New Transcription') {
    return (
      <View>
        <Icon name="plus-circle" size={20} style={styles.icon}/>
        <Text
        style={{fontSize: 12, color: props.focused ? '#F26367' : 'gray'}}>New</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Icon3 name="settings" size={20} style={styles.icon}/>
        <Text
        style={{fontSize: 12, color: props.focused ? '#F26367' : 'gray'}}>{props.title}</Text>
      </View>
    );
  }
};

TabIcon.propTypes = propTypes;

export default TabIcon;

const styles = StyleSheet.create({
  icon: {
    alignSelf:'center',
    paddingBottom:2,
    color: '#F26367'
  },
});
