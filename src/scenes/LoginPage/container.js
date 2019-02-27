import { connect } from 'react-redux';

import LoginPage from './component.js';

function mapState(state) {
  return {
    step: state.app.step,
    stepDetails: state.app.stepDetails,
    storyDetails: state.app.storyDetails,
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
