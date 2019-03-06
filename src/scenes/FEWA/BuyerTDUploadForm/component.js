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

class BuyerTDUploadForm extends Component {
  submitData = async e => {
    e.preventDefault();

    //Change API endpoint for scenario 15
    // const formData = {
    //   'new-td-hash': this.props.newTDHash,
    // };
    // try {
    //   const response = await request({
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     data: formData,
    //     url: '/ajman/request_mpd_noc',
    //   });

    //   if (response.requested) {

    //   } else {
    //     dispatch.verify.verifyDocumentFailed();
    //     this.props.showNotification({
    //       content: response.error,
    //       type: 'error',
    //     });
    //   }
    //   this.props.updateStep({ completed: true });
    //   this.props.push('/thank-you');
    // } catch (error) {
    //   this.props.showNotification({
    //     content: 'Signing Failed',
    //     type: 'error',
    //   });
    // }

    this.props.showNotification({
      content: 'Signed Successfully. Thank you!',
      type: 'success',
    });

    
    this.props.updateStep({ completed: true });
    this.props.push('/thank-you');
  };

  render() {
    const { classes, buyerId } = this.props;

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer />
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
            FEWA - TD Visual
          </Typography>

          <div>
            <FormControl>
              <TextField
                label="Buyer ID"
                margin="dense"
                value={buyerId}
                disabled
              />
            </FormControl>
          </div>
          <div className={classes.formActions}>
            <Button variant="contained" color="primary" type="submit" onClick={this.submitData}>
              Request for Electricity and Water Services
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerTDUploadForm);
