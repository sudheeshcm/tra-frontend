import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PrivateRoute from './component';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps() {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
