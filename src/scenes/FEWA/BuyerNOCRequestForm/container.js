import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerNOCRequestForm from './component';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerNOCRequestForm);
