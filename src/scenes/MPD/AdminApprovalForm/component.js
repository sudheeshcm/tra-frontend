import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { getState } from '@rematch/core';
import dataScenarios from '../../../data.js';
import Loader from '@Components/Loader';

import request from '@Services/ApiService';

const styles = theme => ({
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
  scenarioMsgs: {
    marginTop: theme.spacing.unit * 4,
  },
  scenarioMsg: {
    fontSize: 17,
    fontWeight: '200',
    textAlign: 'left',
    fontFamily: 'inherit',
    lineHeight: 1.5,
    fontWeight: 300,
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
      this.props.toggleLoading(true);
      const response = await request({
        method: 'POST',
        data: formData,
        headers: { 'content-type': 'application/json' },
        url: '/ajman/approve_mpd_noc',
      });

      if (response['mpd-noc-hash']) {
        let mpdNocHash = response['mpd-noc-hash'];
        this.props.setVariableInStore({
          variables: {
            mpdNocHash,
          },
        });
        this.props.toggleLoading(false);
        this.props.showNotification({
          content:
            'Successfully approved Municipality and Planning Department NOC',
          type: 'success',
        });
        this.props.downloadDocument({
          documentHash: response['mpd-noc-hash'],
          title:
            'Municipality and Planning Department No Objection Certificate',
        });
        this.props.updateStep({ completed: true });
        this.props.push('/thank-you');
      } else {
        throw response;
      }
    } catch (err) {
      console.log('S5 : Admin MPD VerificationForm Error: ', err);
      this.props.toggleLoading(false);
      this.props.showNotification({
        content: err.error || 'Failed to sign the document',
        type: 'error',
      });
    }
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer isViewMode />
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
            Ajman MPD - Admin No Objection Certificate Approval
          </Typography>
          {loading ? <Loader /> : <div />}
          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitData}
            >
              Approve
            </Button>
          </div>
          <div className={classes.scenarioMsgs}>
            {dataScenarios[getState().app.stepDetails.step].scenarioMsg.map(
              (msg, index) => (
                <p className={classes.scenarioMsg}>{msg}</p>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminApprovalForm);
