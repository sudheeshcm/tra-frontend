import { connect } from 'react-redux';

import NodesSelection from './component';

const mapStateToProps = state => ({
  loading: state.addNetwork.loading,
  errors: state.addNetwork._errors,
  accounts: state.accounts.accounts,
  basicDetails: state.addNetwork.step0.data,
  data: state.addNetwork.step2.data,
  isAllSubmitted:
    state.addNetwork.step0.submitted && state.addNetwork.step1.submitted,
});

const mapDispatchToProps = dispatch => ({
  validateForm: dispatch.addNetwork.validateForm,
  fetchAccounts: dispatch.accounts.fetchAccounts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodesSelection);
