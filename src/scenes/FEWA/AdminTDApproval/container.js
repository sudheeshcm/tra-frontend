import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminTDApproval from './component';

const mapStateToProps = state => ({
  newTDHash: state.app.newTDHash,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  fetchDocument: dispatch.document.fetchDocument,
  showNotification: dispatch.notification.show,
  downloadDocument: dispatch.document.download,
  resetApp : dispatch.app.resetApp,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTDApproval);
