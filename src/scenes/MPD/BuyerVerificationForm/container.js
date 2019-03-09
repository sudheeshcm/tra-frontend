import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerVerificationForm from './component';

const mapStateToProps = state => ({
  documentHash: state.document.documentHash,
  loading: state.verify.loading,
  started: state.verify.started,
  verified: state.verify.verified,
  file: state.document.file,
  loadingApp: state.app.loading,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  verifyDocument: dispatch.verify.verifyDocument,
  clearCurrentDocument: dispatch.document.clearFile,
  updateStep: dispatch.app.updateStep,
  toggleLoading: dispatch.app.toggleLoading,
  showNotification: dispatch.notification.show,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerVerificationForm);
