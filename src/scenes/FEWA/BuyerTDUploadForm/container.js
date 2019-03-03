import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerTDUploadForm from './component';

const mapStateToProps = state => ({
  buyerId: state.user.currentUser.id,
  documentHash: state.document.documentHash,
  file: state.document.file,
  newTDHash: state.app.newTDHash,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  clearCurrentDocument: dispatch.document.clearFile,
  showNotification: dispatch.notification.show,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerTDUploadForm);
