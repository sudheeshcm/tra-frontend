import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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
        this.props.fetchDocument({
            documentHash: this.props.otHash,
        });
    }

  submitData = async () => {
    const formData = {
        'ot-hash': this.props.otHash,
      };
      try {
        const response = await request({
          method: 'POST',
          data: formData,
          headers: { 'content-type': 'application/json' },
          url: '/ajman/approve_mpd_noc',
        });
        
        if (response["mpd-noc-hash"]) {
          let mpdNocHash = response["mpd-noc-hash"];
          this.props.setVariableInStore({
              variables: {
                  mpdNocHash
              },
              });
          this.props.showNotification({
            content: 'Successfully approved MPD NOC',
            type: 'success',
          });
          this.props.downloadDocument({
            documentHash: response['mpd-noc-hash'],
            title: 'Ownership Document',
          });
          this.props.updateStep({ step: 5, completed: true });
          this.props.push('/thank-you');
        } else {
          throw new Error('Failed to approved the document');
        }
      } catch (err) {
        console.log('S5 : Admin MPD VerificationForm Error: ', err);
        this.props.showNotification({
          content: 'Failed to sign the document',
          type: 'error',
        });
      }
  };

  render() {
    const { classes,  otHash } = this.props;

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer isViewMode/>
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
            MPD - Admin Verification
          </Typography>
          <div className={classes.formActions}>
            <Button variant="contained" color="primary" onClick={this.submitData}>
              confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminApprovalForm);
