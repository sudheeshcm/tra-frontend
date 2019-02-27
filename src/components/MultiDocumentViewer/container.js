import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MultiDocumentViewerComponent from './component';

const mapStateToProps = state => ({
  currentDocument:
    state.multiDocuments.documents[state.multiDocuments.activeIndex],
  file: state.multiDocuments.files[state.multiDocuments.activeIndex],
  requiredFiles: state.multiDocuments.requiredFiles,
  activeIndex: state.multiDocuments.activeIndex,
});

const mapDispatchToProps = dispatch => ({
  fetchDocuments: dispatch.multiDocuments.fetchDocuments,
  setActiveIndex: dispatch.multiDocuments.setActiveIndex,
  setFile: dispatch.multiDocuments.setFile,
  clearFile: dispatch.multiDocuments.clearFile,
});

const MultiDocumentViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiDocumentViewerComponent);

export default withRouter(MultiDocumentViewer);
