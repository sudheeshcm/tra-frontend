import { connect } from 'react-redux';

import BasicInfo from './component';

const mapStateToProps = state => ({
  loading: state.addNetwork.loading,
  errors: state.addNetwork._errors,
  isSubmitted: state.addNetwork.step0.submitted,
  data: state.addNetwork.step0.data,
});

const mapDispatchToProps = dispatch => ({
  validateForm: dispatch.addNetwork.validateForm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicInfo);
