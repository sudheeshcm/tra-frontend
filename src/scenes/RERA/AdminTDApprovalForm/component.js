import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

// import request from '@Services/ApiService';

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
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  onValueChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  submitData = e => {
    e.preventDefault();
    this.props.updateStep({ step: 2, completed: true });
    this.props.push('/thank-you');
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
            RERA Admin TD Approval
          </Typography>
          <div className={classes.formActions}>
            <Button variant="contained" color="primary" type="submit">
              Approve
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminTDApprovalForm);
