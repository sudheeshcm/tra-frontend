import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import SellerVerificationForm from './component';

const mapStateToProps = state => ({
  sellerId: state.app.sellerId,
  buyerId: state.app.buyerId,
  propId: state.app.propId,
  otHash: state.app.otHash,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  fetchDocument: dispatch.document.fetchDocument,
  showNotification: dispatch.notification.show,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerVerificationForm);
