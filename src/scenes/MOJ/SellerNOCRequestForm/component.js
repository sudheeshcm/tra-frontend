import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import multipleDocumentsFilled from '@Utils/validators/multipleDocumentsFilled';
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
    fontFamily: "museo-sans",
    lineHeight: 1.5,
    fontWeight: 300,
   },
});

class SellerNOCRequestForm extends Component {
  componentDidMount() {
    this.props.setRequiredFiles([
      {
        title: 'OT',
        required: true,
      },
      {
        title: 'TD',
        required: true,
      },
    ]);
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  submitData = async e => {
    e.preventDefault();
    const { files } = this.props;
    await this.props.requestNOC(files);
    
  };

  render() {
    const { classes, sellerId, propId, buyerId } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            MOJ - Seller No Objection Certificate Request
          </Typography>

          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.submitData}
              disabled={multipleDocumentsFilled(this.props.files, 2)}
            >
              Submit
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

export default withStyles(styles)(SellerNOCRequestForm);
