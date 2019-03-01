import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminApprovalForm from './component';

const mapStateToProps = state => ({

    otHash: state.app.otHash,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  fetchDocument: dispatch.document.fetchDocument,
  showNotification: dispatch.notification.show,
  downloadDocument: dispatch.document.download,
  setVariableInStore: dispatch.app.setVariableInStore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApprovalForm);
