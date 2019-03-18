import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { getState } from '@rematch/core';

import request from '@Services/ApiService';
import Loader from '@Components/Loader';
import dataScenarios from '../../../data.js';

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
    marginTop: theme.spacing.unit * 3,
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
    this.props.setRequiredFiles([
      {
        title: 'Ownership Transfer',
        required: true,
      },
      {
        title: 'Municipality and Planning Department NOC',
        required: true,
      },
      {
        title: 'Electricity & Water Authority NOC',
        required: true,
      },
      {
        title: 'Ministry Of Justice NOC',
        required: true,
      },
    ]);
    this.props.fetchDocuments({
      documentHashes: [
        this.props.otHash,
        this.props.mpdNocHash,
        this.props.fewaNocHash,
        this.props.mojNocHash,
      ],
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

    this.props.toggleLoading(true);
    try {
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: '/cb/approve_mortgage',
      });
      if (response['mortgage-hash']) {
        const mortgageHash = response['mortgage-hash'];
        this.props.setVariableInStore({
          variables: {
            mortgageHash,
          },
        });
        this.props.toggleLoading(false);
        this.props.showNotification({
          content: 'Successfully approved Mortgage',
          type: 'success',
        });

        this.props.downloadDocument({
          documentHash: response['mortgage-hash'],
          title: 'Mortgage Approval',
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
    const {
      classes,
      loading,
      amount,
      sellerId,
      propId,
      buyerId,
      sellerIBAN,
      buyerIBAN,
    } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer isViewMode />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            ABC Bank - Admin Mortgage Approval
          </Typography>

          <div>
            <FormControl>
              <TextField
                label="Amount"
                margin="dense"
                value={amount}
                disabled
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Property Id"
                margin="dense"
                value={propId}
                disabled
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Seller ID"
                margin="dense"
                value={sellerId}
                disabled
              />
            </FormControl>
          </div>
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
          <div>
            <FormControl>
              <TextField
                label="Seller IBAN"
                margin="dense"
                value={sellerIBAN}
                disabled
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Buyer IBAN"
                margin="dense"
                value={buyerIBAN}
                disabled
              />
            </FormControl>
          </div>
          {loading ? <Loader /> : <div />}
          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button variant="contained" color="primary" type="submit">
              Approve
            </Button>
          </form>
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
