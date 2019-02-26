import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import SellerVerificationForm from './component';

const mapStateToProps = state => ({
  sellerId: 123123 || state.currentUser.id,
  buyerId: 123456,
  propId: 'asdasd',
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerVerificationForm);
