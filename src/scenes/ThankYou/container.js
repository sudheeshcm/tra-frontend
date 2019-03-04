import { connect } from 'react-redux';

import ThankYou from './component.js';

function mapState(state) {
  return {
    stepDetails: state.app.stepDetails,
  };
}

function mapDispatch(dispatch) {
  return {
    updateStep: dispatch.app.updateStep,
    logout: dispatch.user.logout,
  };
}

export default connect(
  mapState,
  mapDispatch,
)(ThankYou);
