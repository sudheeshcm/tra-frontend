import { connect } from 'react-redux';

import LoginPage from './component.js';

function mapState(state) {
  return {
    stepDetails: state.app.stepDetails,
   
  };
}

function mapDispatch(dispatch) {
  // console.log(dispatch.user);
  return {
    login: dispatch.user.login,
  };
}

export default connect(
  mapState,
  mapDispatch,
)(LoginPage);
