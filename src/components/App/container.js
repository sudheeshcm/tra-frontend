import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './component';

function mapState(state) {
  return {
    stepDetails: state.app.stepDetails,
    storyDetails: state.app.storyDetails,
  };
}

function mapDispatch(dispatch) {
  // console.log(dispatch.user);
  return {
    // login: dispatch.user.login,
  };
}

export default withRouter(
  connect(
    mapState,
    mapDispatch,
  )(App),
);
