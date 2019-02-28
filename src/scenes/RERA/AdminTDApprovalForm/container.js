import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminTDApprovalForm from './component';

const mapStateToProps = state => ({
  buyerId: 123456 || state.currentUser.id,
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
)(AdminTDApprovalForm);
