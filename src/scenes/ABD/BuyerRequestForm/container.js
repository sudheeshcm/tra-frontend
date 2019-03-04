import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerRequestForm from './component';

const mapStateToProps = state => ({
  buyerId: state.user.currentUser.id || 123456,
  files: state.multiDocuments.files,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
  showNotification: dispatch.notification.show,

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerRequestForm);
