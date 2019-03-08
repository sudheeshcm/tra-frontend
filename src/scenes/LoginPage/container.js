import { connect } from 'react-redux';

import LoginPage from './component.js';

function mapState(state) {
  return {
    stepDetails: state.app.stepDetails,
    currentUser: state.user.currentUser,
  };
}

function mapDispatch(dispatch) {
  return {
    login: dispatch.user.login,
    resetUser: dispatch.user.resetUser,
  };
}

export default connect(
  mapState,
  mapDispatch,
)(LoginPage);
