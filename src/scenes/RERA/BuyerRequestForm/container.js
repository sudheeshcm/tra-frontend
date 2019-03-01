import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerRequestForm from './component';

const mapStateToProps = state => ({
  buyerId: state.user.currentUser.id || '987654321',
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setOtHash: dispatch.app.setOtHash,
  showNotification: dispatch.notification.show,
  downloadDocument: dispatch.document.download,
  setVariableInStore: dispatch.app.setVariableInStore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerRequestForm);
