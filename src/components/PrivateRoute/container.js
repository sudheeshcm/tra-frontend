import { connect } from 'react-redux';

import PrivateRoute from './component';

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);
