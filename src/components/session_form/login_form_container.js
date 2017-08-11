import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {login, logout, signup} from '../../actions/session_actions';
import LoginForm from './login_form';

import {
  View,
} from 'react-native';

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.errors
  };
};

const mapDispatchToProps = (dispatch, {location}) => {
  const formType = location.pathname.slice(1);
  // const processForm = (formType === 'login') ? login : signup;
  return {
    processForm: user => dispatch(login(user)),
    formType,
    // clearErrors: () => dispatch(clearErrors())
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default connect(null,null)(LoginForm);
