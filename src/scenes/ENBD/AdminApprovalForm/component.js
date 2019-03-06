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
    console.log(this.props)
    this.props.fetchDocument({
      documentHash: this.props.mortgageHash,
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
        url: '/cb/confirm_transfer',
      });

      if (response.confirmed) {
        this.props.showNotification({
          content: 'Mortgage has been approved',
          type: 'success',
        });
        this.props.updateStep({ completed: true });
        this.props.push('/thank-you');
      } else {
        throw response;
      }
    } catch (err) {
      this.props.showNotification({
        content: err.error || 'Failed to approve mortgage',
        type: 'error',
      });
    }
  };

  render() {
    const { classes, otHash } = this.props;

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer isViewMode />
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
            ENBD - Admin Mortgage Approval
          </Typography>
          <div className={classes.formActions} >
            <Button variant="contained" color="primary" type="submit" onClick={this.submitData} >
              APPROVE
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminApprovalForm);
