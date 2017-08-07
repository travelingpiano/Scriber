import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import LoginForm from './components/session/login_form_container';
import SignupForm from './components/session/signup_form_container';
import Dashboard from './components/dashboard';
import Splash from './components/splash';

const Routes = () => (
  <Router>
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
      initial
      key="Splash"
      component={Splash}
    />
  </Router>

);

export default Routes;
