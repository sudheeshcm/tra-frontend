import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import request from '@Services/ApiService';
import multipleDocumentsFilled from '@Utils/validators/multipleDocumentsFilled';
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
   textAlign: 'left',
    fontFamily: "inherit",
    lineHeight: 1.5,
    fontWeight: 300,
   },
});

class BuyerTDRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerId: props.buyerId,
    };
  }

  componentDidMount() {
    this.props.setRequiredFiles([
      {
        title: 'Ownership Transfer',
        required: true,
        key: 'ot-hash',
      },
      {
        title: 'Municipality and Planning Department NOC',
        required: true,
        key: 'mpd-noc-hash',
      },
      {
        title: 'Title Deed',
        required: true,
        key: 'td-hash',
      },
      {
        title: 'Federal Electricity & Water Authority NOC',
        required: true,
        key: 'fewa-noc-hash',
      },
      {
        title: 'Ministry Of Justice NOC',
        required: true,
        key: 'moj-noc-hash',
      },
      {
        title: 'Mortgage Approval',
        required: true,
        key: 'mortgage-hash',
      },
    ]);
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  onValueChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  submitData = async e => {
    const { files } = this.props;
    e.preventDefault();
    const formData = {
      'ot-hash': files[0].documentHash,
      'mpd-noc-hash': files[1].documentHash,
      'td-hash': files[2].documentHash,
      'fewa-noc-hash': files[3].documentHash,
      'moj-noc-hash': files[4].documentHash,
      'mortgage-hash': files[5].documentHash,
    };

    
    try {
      this.props.toggleLoading(true);
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/JSON' },
        data: formData,
        url: '/ajman/request_td',
      });

      if (response.requested) {
        this.props.toggleLoading(false);
        this.props.showNotification({
          content: 'Request for new Title Deed Submitted',
          type: 'success',
        });
      } else {
        this.props.toggleLoading(false);
        this.props.showNotification({
          content: response.error,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error, 'error');
      this.props.toggleLoading(false);
      this.props.showNotification({
        content: 'Request for new Title Deed Failed',
        type: 'error',
      });
    }
    this.props.updateStep({ completed: true });
    this.props.push('/thank-you');
  };

  render() {
    const { classes, buyerId, loading, } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            ARRA - Buyer Title Deed Request
          </Typography>
          <div>
            <FormControl>
              <TextField
                label="Buyer ID"
                margin="dense"
                value={buyerId}
                onChange={this.onValueChange('buyerId')}
                disabled
                required
              />
            </FormControl>
          </div>

          {loading ? <Loader /> : <div />}
          { (multipleDocumentsFilled(this.props.files, 6) || (this.props.verificationStatuses.includes(false))) ?
            <div>
              { dataScenarios[getState().app.stepDetails.step].scenarioMsg.map((msg, index) => (
                <p className={classes.scenarioMsg}>{msg}</p>
              ))}
            </div> : <div />
          }
          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.submitData}
              disabled={(multipleDocumentsFilled(this.props.files, 6) || (this.props.verificationStatuses.includes(false)))}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerTDRequestForm);
