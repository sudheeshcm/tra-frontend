import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
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

class AdminApprovalForm extends Component {
  submitData = e => {
    e.preventDefault();
    //API Call
    this.props.updateStep({ step: 3, completed: true });
    this.props.push('/thank-you');
  };

  render() {
    const { classes, sellerId, propId, buyerId , otHash } = this.props;

    return (
      <div className="seller-verification-form">
        <div className="seller-verification-form__doc-viewer">
          <DocumentViewer />
        </div>

        <div className="seller-verification-form__contents">
          <Typography variant="h6" className={classes.title}>
            RERA - Admin Verification
          </Typography>
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
                label="Property ID"
                margin="dense"
                value={propId}
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

export default withStyles(styles)(AdminApprovalForm);
