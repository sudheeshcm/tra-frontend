import React, { Fragment } from 'react';
import PropTypes, { bool } from 'prop-types';
import SVG from 'react-inlinesvg';
import Dropzone from 'react-dropzone';
import FileSaver from 'file-saver';
import PDF from 'react-pdf-js';
import hashDocument from '@Utils/hashDocument';
import Control from './components/Control';

class DocumentViewerComponent extends React.Component {
  static propTypes = {
    file: PropTypes.instanceOf(Object),
    documentHash: PropTypes.string,
    setFile: PropTypes.func.isRequired,
    clearFile: PropTypes.func.isRequired,
    fetchDocument: PropTypes.func.isRequired,
    isViewMode: bool,
  };

  static defaultProps = {
    file: null,
    documentHash: '',
    isVerificationMode: false,
    isViewMode: false,
  };

  constructor(props) {
    super(props);

    this.canvasState = {
      mouseDown: false,
      lastClientX: null,
      lastClientY: null,
    };

    console.log('TCL: constructor -> props.isViewMode', props.isViewMode);
    this.state = {
      add: !props.isViewMode,
      scale: 1,
      supDocTitle: '',
      activeDocId: props.currentDocument ? props.currentDocument.id : null,
      currentFile: props.file,
      currentDocumentHash: props.documentHash,
      error: '',
    };

    this.fetchedDocFile = false;
  }

  componentWillReceiveProps(nextProps) {
    const thisDoc = this.props.currentDocument;
    const nextDoc = nextProps.currentDocument;

    this.setState({
      add: !nextProps.isViewMode && !nextProps.currentDocument,
      currentFile: nextProps.file,
    });
  }

  componentDidUpdate() {
    this.canvas =
      this.canvasWrapper && this.canvasWrapper.querySelector('canvas');

    if (this.canvas) {
      const canvasScrollerStyle = window.getComputedStyle(this.canvasScroller);
      const canvasScrollerSpacing =
        parseInt(canvasScrollerStyle.paddingTop, 10) +
        parseInt(canvasScrollerStyle.paddingBottom, 10);
      const canvasOverflow =
        this.canvas.width > this.canvasScroller.clientWidth ||
        this.canvas.height >
          this.canvasScroller.clientHeight - canvasScrollerSpacing;

      if (canvasOverflow !== this.state.canvasOverflow) {
        // eslint-disable-next-line
        this.setState({ canvasOverflow });
      }

      this.canvas.classList[canvasOverflow ? 'add' : 'remove']('is-movable');
    }
  }

  componentWillUnmount() {
    this.props.clearFile();
  }

  onCanvasMouseMove = event => {
    if (this.canvasState.mouseDown) {
      event.currentTarget.scrollBy(
        this.canvasState.lastClientX -
          (this.canvasState.lastClientX = event.clientX),
        this.canvasState.lastClientY -
          (this.canvasState.lastClientY = event.clientY),
      );
    }
  };

  onCanvasMouseDown = event => {
    this.canvasState.lastClientY = event.clientY;
    this.canvasState.lastClientX = event.clientX;
    this.canvasState.mouseDown = true;
    this.canvas.classList.add('is-moving');
  };

  onCanvasMouseUp = () => {
    this.canvasState.mouseDown = false;
    this.canvas.classList.remove('is-moving');
  };

  onDownloadProgress = progress => {
    const curDoc = this.props.currentDocument;

    if (progress.loaded && curDoc && curDoc.fileSize) {
      const downloadProgress = Math.round(
        (progress.loaded * 100) / curDoc.fileSize,
      );
      this.setState({ downloadProgress });
    }
  };

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  onPageComplete = page => {
    this.setState({ page });
  };

  onDrop = async (accepted, rejected) => {
    this.setState({ error: '' });
    const { clearFile } = this.props;
    const file = accepted[0] || rejected[0];
    const fileSize = file.size / 1024 / 1024;

    let error = '';

    if (fileSize <= 200) {
      console.log('file: ', file);
      this.props.setFile({ file });

      if (this.props.isVerificationMode) {
        const documentHash = await hashDocument(file);
        this.props.setFile({ file, documentHash });
      }
    } else {
      error = 'PDF size should be less than 200MB';
    }
    if (error) {
      clearFile();
      this.setState({ error });
    }
  };

  zoomOut = () => {
    if (this.state.scale > 0.25) {
      this.setState(({ scale }) => ({ scale: scale - 0.25 }));
    }
  };

  zoomIn = () => this.setState(({ scale }) => ({ scale: scale + 0.25 }));

  renderPDFControls = () => {
    const { page, pages, scale, currentFile } = this.state;

    const { currentDocument: doc } = this.props;
    return (
      <Fragment>
        <div className="document-preview__zoom">
          <Control
            onClick={this.zoomOut}
            icon="remove"
            iconStyle={{ left: '-1px' }}
          />
          <span className="document-preview__control__text">
            {scale * 100}%
          </span>
          <Control
            onClick={this.zoomIn}
            icon="add"
            iconStyle={{ left: '-1px' }}
          />
        </div>
        {pages && (
          <div className="document-preview__pagination">
            <Control
              onClick={() => this.setState({ page: page - 1 })}
              icon="chevron_left"
              iconStyle={{ left: '-3px', fontSize: '24px' }}
              style={{ visibility: page > 1 ? 'visible' : 'hidden' }}
            />
            <span className="document-preview__control__text document-preview__pagination__text">
              <em>{page}</em> / {pages}
            </span>
            <Control
              onClick={() => this.setState({ page: page + 1 })}
              icon="chevron_right"
              iconStyle={{ left: '-3px', fontSize: '24px' }}
              style={{
                visibility: pages > 1 && page !== pages ? 'visible' : 'hidden',
              }}
            />
          </div>
        )}
        <div className="document-preview__toggles">
          {doc && doc.downloadable && (
            <Control
              onClick={() => FileSaver.saveAs(currentFile, `${doc.title}.pdf`)}
              icon="file_download"
              iconStyle={{ left: '-2px', fontSize: '22px' }}
            />
          )}
        </div>
      </Fragment>
    );
  };

  renderPDF = () => {
    const { currentFile, add } = this.state;
    const { currentDocument } = this.props;

    let filePath = '';
    if (currentFile && currentDocument && !add) {
      filePath = window.URL.createObjectURL(currentFile);
    } else if (currentFile && add) {
      filePath = currentFile.preview;
    }
    if (filePath) {
      return (
        <div
          ref={canvasScroller => {
            this.canvasScroller = canvasScroller;
          }}
          className="document-preview__canvas__scroller"
          {...(this.state.canvasOverflow
            ? {
                onMouseMove: this.onCanvasMouseMove,
                onMouseDown: this.onCanvasMouseDown,
                onMouseUp: this.onCanvasMouseUp,
              }
            : {})}
        >
          <PDF
            className="document-preview__canvas"
            file={filePath}
            onDocumentComplete={this.onDocumentComplete}
            onPageComplete={this.onPageComplete}
            page={this.state.page}
            scale={this.state.scale}
          />
        </div>
      );
    }
    return null;
  };

  renderSupportingDocs = () => {
    const { supDocTitle, activeDocId } = this.state;
    const { currentDocument: doc } = this.props;
    return (
      <Fragment>
        <div className="document-navigation__wrapper">
          <a
            className="document-navigation__toggle"
            onClick={() => this.setState({ docNavActive: true })}
          >
            <div className="document-navigation__toggle__mask" />
            <i className="document-navigation__toggle__icon material-icons">
              keyboard_arrow_up
            </i>
            <div className="document-navigation__toggle__text">
              View supporting documents
            </div>
          </a>
        </div>
        <div className="document-navigation__wrapper">
          <div className="document-navigation__documents">
            <a
              className="document-navigation__close material-icons"
              onClick={() => this.setState({ docNavActive: false })}
            >
              close
            </a>
            <div className="document-navigation__main-doc">
              <div className="document-navigation__title">Current document</div>
              <a
                className={`document-navigation__main-doc__doc ${
                  activeDocId === doc.id ? 'is-active' : ''
                }`}
                onClick={() =>
                  this.props.fetchDocumentFile(doc.id, this.onDownloadProgress)
                }
              >
                <img
                  // src={imageUrl(doc.imageName)}
                  className="document-navigation__img"
                  alt="alternate doc"
                />
              </a>
            </div>
            <div className="document-navigation__supporting-docs">
              <div className="document-navigation__title">
                Supporting documents
              </div>
              <div className="document-navigation__scroller-wrapper">
                <a
                  className="document-navigation__nav document-navigation__nav--left material-icons"
                  onClick={() => {
                    this.scroller.scrollLeft -= 122;
                  }}
                >
                  chevron_left
                </a>
                <ul
                  ref={scroller => {
                    this.scroller = scroller;
                  }}
                  className="document-navigation__scroller"
                >
                  {doc.supportingDocuments.map(supDoc => (
                    <li
                      key={supDoc.id}
                      className="document-navigation__scrollee"
                    >
                      <a
                        className={`document-navigation__supporting-doc ${
                          activeDocId === supDoc.id ? 'is-active' : ''
                        }`}
                        onMouseEnter={() =>
                          this.setState({ supDocTitle: supDoc.title })
                        }
                        onMouseLeave={() => this.setState({ supDocTitle: '' })}
                        onClick={() =>
                          this.props.fetchDocumentFile(
                            supDoc.id,
                            this.onDownloadProgress,
                          )
                        }
                      >
                        <img
                          // src={imageUrl(supDoc.imageName)}
                          className="document-navigation__img"
                          alt="alternate doc"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  className="document-navigation__nav document-navigation__nav--right material-icons"
                  onClick={() => {
                    this.scroller.scrollLeft += 122;
                  }}
                >
                  chevron_right
                </a>
              </div>
              <div className="document-navigation__supporting-doc__title">
                <span className="document-navigation__supporting-doc__title__text">
                  {supDocTitle ||
                    (
                      doc.supportingDocuments.find(
                        supDoc => supDoc.id === activeDocId,
                      ) || {}
                    ).title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      downloadProgress,
      add,
      docNavActive,
      currentFile,
      error,
    } = this.state;

    const { currentDocument: doc } = this.props;

    return (
      <div className="document-preview">
        <div
          className="document-preview__main"
          onClick={() => this.setState({ docNavActive: false })}
        >
          <div className="document-preview__controls">
            {currentFile ? this.renderPDFControls() : null}
          </div>
          {add && currentFile && (
            <div className="document-preview__default-controls">
              <Control
                onClick={() => {
                  this.props.clearFile();
                }}
                icon="close"
                iconStyle={{ left: '-2px', fontSize: '22px' }}
              />
            </div>
          )}
          <div className="document-preview__view">
            {currentFile && (
              <div
                ref={canvasWrapper => {
                  this.canvasWrapper = canvasWrapper;
                }}
                className="document-preview__canvas__wrapper"
              >
                {this.renderPDF()}
              </div>
            )}

            {!add && !currentFile && (
              <div className="document-preview__view__progress">
                {/* <div className="document-preview__view__progress__wrapper">
                  <div
                    className="document-preview__view__progress__bar"
                    style={{ transform: `translateX(${downloadProgress}%)` }}
                  />
                </div> */}
                <div className="document-preview__view__progress__text">
                  {downloadProgress
                    ? `${downloadProgress}%`
                    : 'Loading Document...'}
                </div>
              </div>
            )}
            {add && !currentFile && (
              <Dropzone
                className={`document-preview__view__dropzone ${error &&
                  'dropzone__error'}`}
                onDrop={this.onDrop}
                accept=".pdf"
                multiple={false}
                ref={dropArea => {
                  this.dropzone = dropArea;
                }}
              >
                <SVG
                  src="/static/img/upload.svg"
                  className="document-preview__view__dropzone__image"
                />
                Click or drag and drop a document to upload
                <div className="document-preview__view__dropzone__error">
                  {error}
                </div>
              </Dropzone>
            )}
          </div>
        </div>
        {doc &&
          doc.supportingDocuments &&
          doc.supportingDocuments.length > 0 && (
            <div
              className={`document-navigation ${
                docNavActive ? 'is-active' : ''
              }`}
            >
              {this.renderSupportingDocs()}
            </div>
          )}
      </div>
    );
  }
}

export default DocumentViewerComponent;
