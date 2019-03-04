import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
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

class AdminTDApprovalForm extends Component {
  componentDidMount() {
    this.props.setRequiredFiles([
      {
        title: 'OT',
        required: true,
      },
      {
        title: 'MPD NOC',
        required: true,
      },
      {
        title: 'TD',
        required: true,
      },
      {
        title: 'FEWA NOC',
        required: true,
      },
      {
        title: 'MOJ NOC',
        required: true,
      },
      {
        title: 'Mortgage Approval',
        required: true,
      },
    ]);

    this.props.fetchDocuments({
      documentHashes: [
        this.props.otHash,
        this.props.mpdNocHash,
        this.props.tdHash,
        this.props.fewaNocHash,
        this.props.mojNocHash,
        this.props.abdMortgageHash,
      ],
    });
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  onValueChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  submitData = async e => {
    e.preventDefault();
    const formData = {
      'ot-hash': this.props.otHash,
    };

    //Change API endpoint for Scenario 14
    try {
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: '/ajman/approve_td',
      });

      this.props.showNotification({
        content: 'New Title Deed granted',
        type: 'success',
      });

      this.props.setVariableInStore({
        newTDHash: response['new-td-hash'],
      });

      this.props.downloadDocument({
        documentHash: response['new-td-hash'],
        title: 'New Title Deed',
      });

      this.props.updateStep({ completed: true });
      this.props.push('/thank-you');
    } catch (error) {
      console.log(error);
      this.props.showNotification({
        content: 'Failed to submit data. Please try again later',
        type: 'error',
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <MultiDocumentViewer isViewMode />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            RERA Admin TD Approval
          </Typography>
          <div className={classes.formActions}>
            <Button variant="contained" color="primary" type="submit" onClick={this.submitData}>
              Approve
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminTDApprovalForm);
