import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {StyleSheet, Text} from 'react-native';

import LoginForm from './components/session_form/login_form_container';
import SignupForm from './components/session_form/signup_form';
import Dashboard from './components/dashboard';
import TranscriptionForm from './components/transcription/transcription_form';
import Splash from './components/splash';
import Attendees from './components/transcription/attendees';
import RecordAudio from './components/transcription/record_audio';
import TranscriptionIndex from './components/transcription/transcription_index_container';
import TranscriptionShow from './components/transcription/transcription_show_container';
import TranscriptionEdit from './components/transcription/transcription_edit_container';
import TabIcon from './lib/tabIcon';
import Icon from 'react-native-vector-icons/FontAwesome';


const Routes = () => (
  <Router>
    <Scene
      key="Root"
      title="Welcome"
    >
      <Scene
        key="LoginForm"
        back
        component={LoginForm}
        title="Login"
      />

      <Scene
        key="TranscriptionEdit"
        back
        component={TranscriptionEdit}
        title="Edit Transcription"
      />

      <Scene
        key="SignupForm"
        back
        component={SignupForm}
        title="Signup"
      />

      <Scene
        key="Attendees"
        component={Attendees}
        title="Add Attendees"
        back
      />

      <Scene
        key="RecordAudio"
        component={RecordAudio}
        title="Record Audio"
      />

      <Scene
        key="TranscriptionShow"
        back
        component={TranscriptionShow}
        title="Transcription"
        rightTitle="Edit"
        onRight={() => Actions.TranscriptionEdit()}
        onBack={() => Actions.TranscriptionIndex()}
      />

      <Scene
        initial
        key="Splash"
        component={Splash}
        hideNavBar
      />

      <Scene
        key="tabbar"
        gestureEnabled={false}
        showLabel={false}
        tabs={true}
        tabBarStyle={styles.tabBarStyle}
        activeBackgroundColor='#ddd'
        hideNavBar
      >
        <Scene
          key="TranscriptionIndex"
          component={TranscriptionIndex}
          title="Transcriptions"
          icon={TabIcon}>

        </Scene>
      <Scene key="TranscriptionForm"
        title="New Transcription"
        back
        icon={TabIcon}
        component={TranscriptionForm} />
      <Scene
        key="Dashboard"
        back
        component={Dashboard}
        title="Settings"
        icon={TabIcon}
      />
      </Scene>
    </Scene>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});


export default Routes;
