import { connect } from 'react-redux';

import LoginPage from './component.js';

// function mapState(state) {
//   return {
//     // currentUser: state.user.currentUser,
//   };
// }

function mapDispatch(dispatch) {
  // console.log(dispatch.user);
  return {
    login: dispatch.user.login,
  };
}

export default connect(
  null,
  mapDispatch,
)(LoginPage);
