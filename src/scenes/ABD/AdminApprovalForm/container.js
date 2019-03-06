import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AdminApprovalForm from './component';

const mapStateToProps = state => ({
  otHash: state.app.otHash ,
  mpdNocHash: state.app.mpdNocHash ,
  fewaNocHash: state.app.fewaNocHash ,
  mojNocHash: state.app.mojNocHash ,
  amount: state.app.amount ,
  sellerId: state.app.sellerId ,
  propId: state.app.propId ,
  buyerId: state.app.buyerId ,
  sellerIBAN: state.app.sellerIBAN ,
  buyerIBAN: state.app.buyerIBAN ,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
  setRequiredFiles: dispatch.multiDocuments.setRequiredFiles,
  resetRequiredFiles: dispatch.multiDocuments.resetRequiredFiles,
  fetchDocuments: dispatch.multiDocuments.fetchDocuments,
  downloadDocument: dispatch.document.download,
  showNotification: dispatch.notification.show,
  setVariableInStore: dispatch.app.setVariableInStore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminApprovalForm);
