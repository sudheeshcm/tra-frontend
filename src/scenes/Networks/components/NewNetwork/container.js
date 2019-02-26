import { connect } from 'react-redux';

import NewNetwork from './component';

const mapStateToProps = state => ({
  loading: state.addNetwork.loading,
  errors: state.addNetwork._errors,
  step0: state.addNetwork.step0,
  step1: state.addNetwork.step1,
  step2: state.addNetwork.step2,
});

const mapDispatchToProps = dispatch => ({
  validateForm: dispatch.addNetwork.validateForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewNetwork);
