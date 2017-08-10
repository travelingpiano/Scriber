import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {StyleSheet, Text} from 'react-native';

import LoginForm from './components/session_form/login_form';
import SignupForm from './components/session_form/signup_form';
import Dashboard from './components/dashboard';
import TranscriptionForm from './components/transcription/transcription_form';
import Splash from './components/splash';
import RecordAudio from './components/transcription/record_audio';
import TranscriptionIndex from './components/transcription/transcription_index_container';
import TranscriptionShow from './components/transcription/transcription_show_container';
import TabIcon from './lib/tabIcon';

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
        key="SignupForm"
        back
        component={SignupForm}
        title="Signup"
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
          title="Your Transcriptions"
          icon={TabIcon}
        />
      <Scene key="TranscriptionForm"
        title="New Transcription"
        back
        icon={TabIcon}
        component={TranscriptionIndex} />
      <Scene
        key="Dashboard"
        back
        component={Dashboard}
        title="User Settings"
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
