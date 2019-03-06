import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
import Loader from '@Components/Loader';

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

class SellerVerificationForm extends Component {
  componentDidMount() {
    this.props.fetchDocument({
      documentHash: this.props.otHash,
    });
  }

  submitData = async () => {
    const formData = {
      'ot-hash': this.props.otHash,
    };
    this.props.toggleLoading(true);
    try {
      const response = await request({
        method: 'POST',
        data: formData,
        url: '/ajman/sign_ot_by_seller',
      });

      if (response.signed) {
        this.props.toggleLoading(false);
        this.props.showNotification({
          content: 'Successfully signed the document',
          type: 'success',
        });
        this.props.updateStep({ completed: true });
        this.props.push('/thank-you');
      } else {
        throw response;
      }
    } catch (err) {
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
            RERA - Seller Ownership Transfer Approval
            <br />
            دائرة الأراضي والتنظيم العقاري/ حكومة عجمان - توقيع المالك على نموذج
            نقل الملكية
          </Typography>

          {loading ? <Loader /> : <div />}

          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitData}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SellerVerificationForm);
