import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DocumentViewer from '@Components/DocumentViewer';
import request from '@Services/ApiService';
import Loader from '@Components/Loader';

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

class AdminTDApproval extends Component {
  componentDidMount() {
    this.props.fetchDocument({
      documentHash: this.props.newTDHash,
    });
  }

  submitData = async () => {
    // const formData = {
    //   'new-td-hash': this.props.newTDHash,
    // };
    // try {
    //   const response = await request({
    //     method: 'POST',
    //     data: formData,
    //     url: '/ajman/sign_ot_by_seller',
    //   });

    //   if (response.signed) {
    //     this.props.showNotification({
    //       content: 'Successfully provisioned utilities',
    //       type: 'success',
    //     });
    //     localStorage.clear();
    //     this.props.updateStep({ step: 1, completed: true });
    //     this.props.push('/login')
    //   } else {
    //     throw response;
    //   }
    // } catch (err) {
    //   localStorage.clear();
    //   this.props.updateStep({ step: 1, completed: true });
    //   this.props.push('/login')
    //   this.props.showNotification({
    //     content: err.error || 'Failed to provision utilies',
    //     type: 'error',
    //   });

    // }
    this.props.toggleLoading(true);
    this.props.toggleLoading(false);
    this.props.showNotification({
      content: 'Successfully provisioned utilities',
      type: 'success',
    });

    localStorage.clear();
    this.props.resetApp();
    this.props.updateStep({step:1, completed: false });
    this.props.push('/login');
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div className="buyer-fewa-noc-form">
        <div className="buyer-fewa-noc-form__doc-viewer">
          <DocumentViewer isViewMode />
        </div>

        <div className="buyer-fewa-noc-form__contents">
          <Typography variant="h6" className={classes.title}>
            FEWA - Utilities Approval
          </Typography>
          {loading ? <Loader /> : <div />}
          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button variant="contained" color="primary" type="submit">
              Provision Utilities
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminTDApproval);
