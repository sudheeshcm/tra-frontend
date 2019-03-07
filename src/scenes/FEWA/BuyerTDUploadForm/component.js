import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import request from '@Services/ApiService';
import { getState } from '@rematch/core';
import dataScenarios from '../../../data.js';


const styles = (theme) => ({
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
  scenarioMsgs : {
    marginTop: theme.spacing.unit * 4,
  },
  scenarioMsg: {
    fontSize: 17,
    fontWeight: '200',
  //   textAlign: 'center',
    fontFamily: "museo-sans",
    lineHeight: 1.5,
    fontWeight: 300,
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

    localStorage.clear();
    this.props.updateStep({step:1, completed: true });
    this.props.push('/login');
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
          <center>
        <ul className={classes.scenarioMsgs} >
            { dataScenarios[getState().app.stepDetails.step].scenarioMsg.map((msg, index) => (
              <li className={classes.scenarioMsg}>{msg}</li>
            ))}
        </ul>
        </center>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerTDUploadForm);
