import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {receiveCurrentUser} from '../../actions/session_actions';
import LoginForm from './login_form';

import {
  View,
} from 'react-native';

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.session.currentUser
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   console.log('dispatch here');
//   return {
//   receiveCurrentUser: username => dispatch(receiveCurrentUser(username)),
//   };
//     // clearErrors: () => dispatch(clearErrors())
// };



// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default connect(null,null)(LoginForm);
