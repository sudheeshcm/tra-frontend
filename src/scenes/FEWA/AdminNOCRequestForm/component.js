import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import Loader from '@Components/Loader';
import request from '@Services/ApiService';

const styles = () => ({
  title: {
    marginTop: '24px',
    fontWeight: '500',
    fontSize: '20px',
    textAlign: 'center',
  },
  formActions: {
    marginTop: '32px',
    textAlign: 'center',
  },
  infoCard: {
    maxWidth: '600px',
    margin: '24px auto',
    marginTop: '32px',
    padding: '30px',
  },
  advancedButton: {
    marginRight: '8px',
    width: '160px',
    border: '1px solid lightgrey',
  },
});

class AdminApprovalForm extends Component {
  componentDidMount() {
    this.props.setRequiredFiles([
      {
        title: 'OT',
        required: true,
      },
      {
        title: 'MPD NOC',
        required: true,
      },
    ]);
    this.props.fetchDocuments({
      documentHashes: [this.props.otHash, this.props.mpdNocHash],
    });
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  submitData = async e => {
    e.preventDefault();
    const formData = {
      'ot-hash': this.props.otHash,
    };
    try {
      this.props.toggleLoading(true);
          const response = await request({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: formData,
            url: '/uae/approve_fewa_noc',
          });
          if (response['fewa-noc-hash']) {
              let fewaNocHash = response['fewa-noc-hash'];
              this.props.setVariableInStore({
                  variables: {
                    fewaNocHash
                  },
                });
                this.props.toggleLoading(false);
              this.props.showNotification({
                content: 'Successfully approved FEWA NOC',
                type: 'success',
              });
            
              this.props.downloadDocument({
                documentHash: response['fewa-noc-hash'],
                title: 'FEWA No Objection Certificate',
              });
            
              this.props.updateStep({ completed: true });
              this.props.push('/thank-you');
          }

    } catch (error) {
      this.props.toggleLoading(false);
      this.props.showNotification({
        content: 'Failed to submit data. Please try again later',
        type: 'error',
      });
    }
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer isViewMode />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            FEWA - Admin No Objection Certificate Approval
          </Typography>
          {loading ? <Loader /> : <div />}
          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button variant="contained" color="primary" type="submit">
              Approve
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminApprovalForm);
