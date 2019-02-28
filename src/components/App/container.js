import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import App from './component';

function mapState(state) {
  return {
    stepDetails: state.app.stepDetails,
    currentUser: state.user.currentUser,
  };
}

function mapDispatch(dispatch) {
  return {
    push: args => dispatch(push(args)),
  };
}

export default withRouter(
  connect(
    mapState,
    mapDispatch,
  )(App),
);
