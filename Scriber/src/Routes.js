import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import LoginForm from './components/session_form/login_form';
import SignupForm from './components/session_form/signup_form';
import Dashboard from './components/dashboard';
import Splash from './components/splash';
import RecordAudio from './components/transcription/record_audio';
import TranscriptionIndex from './components/transcription/transcription_index_container';

const Routes = () => (
  <Router>
    <Scene
      key="Root"
      title="Welcome"
    >
      <Scene
        key="LoginForm"
        component={LoginForm}
        title="Login"
      />

      <Scene
        key="SignupForm"
        component={SignupForm}
        title="Signup"
      />

      <Scene
        key="Dashboard"
        component={Dashboard}
        title="Dashboard"
      />

      <Scene
        key="RecordAudio"
        component={RecordAudio}
        title="Record Audio"
      />

      <Scene
        key="TranscriptionIndex"
        component={TranscriptionIndex}
        title="All Transcriptions"
      />

      <Scene
        initial
        key="Splash"
        component={Splash}
      />
    </Scene>
  </Router>

);

export default Routes;
