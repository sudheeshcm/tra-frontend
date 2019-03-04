import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminTDApprovalForm from './component';

const mapStateToProps = state => ({
  otHash: state.app.otHash,
  mpdNocHash: state.app.mpdNocHash,
  tdHash: state.app.tdHash,
  fewaNocHash: state.app.fewaNocHash,
  mojNocHash: state.app.mojNocHash,
  mortgageHash: state.app.mortgageHash,
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
)(AdminTDApprovalForm);
