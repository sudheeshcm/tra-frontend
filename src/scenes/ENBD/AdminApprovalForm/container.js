import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminApprovalForm from './component';

const mapStateToProps = state => ({
  
  hash : "asdasdsadsa" || state.app.mortgageHash
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApprovalForm);
