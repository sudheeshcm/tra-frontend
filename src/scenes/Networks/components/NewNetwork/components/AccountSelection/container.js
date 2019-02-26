import { connect } from 'react-redux';

import AccountSelection from './component';

const mapStateToProps = state => ({
  loading: state.addNetwork.loading,
  errors: state.addNetwork._errors,
  accounts: state.accounts.accounts,
  isSubmitted: state.addNetwork.step1.submitted,
  basicDetails: state.addNetwork.step0.data,
  data: state.addNetwork.step1.data,
});

const mapDispatchToProps = dispatch => ({
  validateForm: dispatch.addNetwork.validateForm,
  fetchAccounts: dispatch.accounts.fetchAccounts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSelection);
