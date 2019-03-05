import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DocumentViewerComponent from './component';

const mapStateToProps = state => ({
  currentDocument: state.document.currentDocument,
  file: state.document.file,
});

const mapDispatchToProps = dispatch => ({
  fetchDocument: dispatch.document.fetchDocument,
  setFile: dispatch.document.setFile,
  clearFile: dispatch.document.clearFile,
  clearAllDocuments: dispatch.document.clearAll,
  verifyDocument: dispatch.verify.verifyDocument,
});

const DocumentViewer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentViewerComponent);

export default withRouter(DocumentViewer);
