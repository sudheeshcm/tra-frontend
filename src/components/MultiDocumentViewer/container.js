import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MultiDocumentViewerComponent from './component';

const mapStateToProps = state => ({
  currentDocument:
    state.multiDocuments.documents[state.multiDocuments.activeIndex],
  file: state.multiDocuments.files[state.multiDocuments.activeIndex],
  requiredFiles: state.multiDocuments.requiredFiles,
  activeIndex: state.multiDocuments.activeIndex,
  verificationStatuses: state.multiDocuments.verificationStatuses,
  loading: state.app.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchDocuments: dispatch.multiDocuments.fetchDocuments,
  setActiveIndex: dispatch.multiDocuments.setActiveIndex,
  setFile: dispatch.multiDocuments.setFile,
  verifyFile: dispatch.multiDocuments.verifyFile,
  clearFile: dispatch.multiDocuments.clearFile,
  clearAllFiles: dispatch.multiDocuments.resetAll,
  toggleLoading: dispatch.app.toggleLoading,
  showNotification: dispatch.notification.show,
});

const MultiDocumentViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiDocumentViewerComponent);

export default withRouter(MultiDocumentViewer);
