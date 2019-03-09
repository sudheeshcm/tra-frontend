import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DocumentViewer from '@Components/DocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { getState } from '@rematch/core';
import dataScenarios from '../../../data.js';


// import request from '@Services/ApiService';

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
   },
});

class BuyerVerificationForm extends Component {
  static defaultProps = {
    file: null,
    documentHash: '',
  };

  state = {
    verified: false,
    loading: false,
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      documentHash: nextProps.documentHash,
      loading: nextProps.loading,
      started: nextProps.started,
      verified: nextProps.verified,
      file: nextProps.file,
    };
  }

  componentWillUnmount() {
    this.props.clearCurrentDocument();
  }

  submitData = e => {
    e.preventDefault();
    this.props.updateStep({completed: true });
    this.props.push('/thank-you');
  };
  
  render() {
    const { classes } = this.props;
    let verificationComponent;
    if (this.state.started && this.state.verified) {
      verificationComponent = (
        <div>
          <div className="document-verification_label">
            <div className="circle-loader load-complete">
              <div className="checkmark draw" />
            </div>
          </div>
          <div className="document-verification_label__hash">
            Document Hash : {this.props.documentHash}
          </div>
        </div>
      );
    } else if (this.state.started && !this.state.verified) {
      verificationComponent = (
        <div className="document-verification_label">
          <Icon className="unverified">close</Icon> This document is invalid
        </div>
      );
    } else {
      verificationComponent = (
        <div className="document-verification_label">
          { dataScenarios[getState().app.stepDetails.step].scenarioMsg.map((msg, index) => (
            <p className={classes.scenarioMsg}>{msg}</p>
          ))}      
        </div>
      );
    }

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer isVerificationMode />
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
          Ajman MPD - Buyer No Objection Certificate Request
          </Typography>

          <div className="buyer-verification-form-container">
            {this.state.loading ? (
              <div className="lds-ring">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              <div className="">{verificationComponent}</div>
            )}
          </div>

          <form className={classes.form} onSubmit={this.submitData}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!this.state.verified}
            >
              SUBMIT
            </Button>
          </form>
         
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerVerificationForm);
