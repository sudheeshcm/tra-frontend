import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerTDRequestForm from './component';

const mapStateToProps = state => ({
  buyerId: state.user.currentUser.id,
  files: state.multiDocuments.files,
  loading: state.app.loading,
  verificationStatuses: state.multiDocuments.verificationStatuses,
});


const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
  showNotification: dispatch.notification.show,
  toggleLoading: dispatch.app.toggleLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerTDRequestForm);
