import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerRequestForm from './component';

const mapStateToProps = state => ({
  buyerId: state.user.currentUser.id,
});


const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerRequestForm);
