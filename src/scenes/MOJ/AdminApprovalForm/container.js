import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminApprovalForm from './component';

const mapStateToProps = state => ({
  otHash: state.app.otHash,
  tdHash: state.app.tdHash,
  loading: state.app.loading,
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
  toggleLoading: dispatch.app.toggleLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApprovalForm);
