import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminApprovalForm from './component';

const mapStateToProps = state => ({
  otHash:
    state.app.otHash || 'ad2577cc339d5edea419fd1cc0f4d13ca93136afce88bd648c43098fbdedb5be',
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
  fetchDocuments: dispatch.multiDocuments.fetchDocuments,
  downloadDocument: dispatch.document.download,
  showNotification: dispatch.notification.show,
  setVariableInStore: dispatch.app.setVariableInStore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApprovalForm);
