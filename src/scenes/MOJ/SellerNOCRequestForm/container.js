import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import SellerNOCRequestForm from './component';

const mapStateToProps = state => ({
  files: state.multiDocuments.files,
  loading: state.app.loading,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
  requestNOC: dispatch.sellerMoJ.requestNOC,
  setVariableInStore: dispatch.app.setVariableInStore,
  toggleLoading: dispatch.app.toggleLoading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerNOCRequestForm);
