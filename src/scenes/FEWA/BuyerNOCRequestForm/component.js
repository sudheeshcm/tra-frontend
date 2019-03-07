import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import multipleDocumentsFilled from '@Utils/validators/multipleDocumentsFilled';
import request from '@Services/ApiService';
import { getState } from '@rematch/core';
import dataScenarios from '../../../data.js';
import Loader from '@Components/Loader';


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

class BuyerNOCRequestForm extends Component {
  componentDidMount() {
    this.props.setRequiredFiles([
      {
        title: 'Ownership Transfer',
        required: true,
      },
      {
        title: 'Municipality and Planning Department NOC',
        required: true,
      },
    ]);
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  submitData = async e => {
    e.preventDefault();
    const formData = {
      'ot-hash': this.props.files[0].documentHash,
      'mpd-noc-hash': this.props.files[1].documentHash,
    };
    try {
      this.props.toggleLoading(true);
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: '/uae/request_fewa_noc',
      });

      if (response.requested) {
        this.props.toggleLoading(false);
        this.props.showNotification({
          content: 'Successfully requested FEWA NOC',
          type: 'success',
        });

        this.props.updateStep({ completed: true });
        this.props.push('/thank-you');
      } else {
      }
    } catch (error) {
      this.props.toggleLoading(false);
      this.props.showNotification({
        content: 'Failed to submit data. Please try again later',
        type: 'error',
      });
    }
  };

  disableButton = filesArray =>
    filesArray.length >= 2 && !filesArray.slice(0, 2).some(isNull);

  render() {
    const { classes, loading } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            FEWA - Buyer No Objection Certificate Request
          </Typography>
          {loading ? <Loader /> : <div />}
          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={(multipleDocumentsFilled(this.props.files, 2) || (this.props.verificationStatuses.includes(false)))}
            >
              Submit
            </Button>
          </form>
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

export default withStyles(styles)(BuyerNOCRequestForm);
