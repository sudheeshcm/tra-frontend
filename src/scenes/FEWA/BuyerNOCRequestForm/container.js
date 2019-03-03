import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerNOCRequestForm from './component';

const mapStateToProps = state => ({
  otHash: state.app.otHash,
  mpdNocHash: state.app.mpdNocHash,
  files: state.multiDocuments.files,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  showNotification: dispatch.notification.show,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerNOCRequestForm);
