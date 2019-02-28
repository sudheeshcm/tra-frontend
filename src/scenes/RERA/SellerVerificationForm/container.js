import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import SellerVerificationForm from './component';

const mapStateToProps = state => ({
  sellerId: 123123 || state.currentUser.id,
  buyerId: 123456,
  propId: 'asdasd',
  otHash:
    state.app.otHash ||
    'fdd9a4bc73134a60d52d8131cf07557e0c04d401aa9f5483a920dc5625913f58',
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  fetchDocument: dispatch.document.fetchDocument,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerVerificationForm);
