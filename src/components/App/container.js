import { connect } from 'react-redux';

import App from './component.jsx';

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

export default connect(
  mapState,
  mapDispatch,
)(App);
