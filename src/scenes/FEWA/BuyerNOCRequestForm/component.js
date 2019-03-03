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

class BuyerNOCRequestForm extends Component {
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
    ]);
  }

  componentWillUnmount() {
    this.props.resetRequiredFiles();
  }

  submitData = async e => {
    e.preventDefault();
    const formData = {
      'ot-hash': this.props.files[0].documentHash,
      'mpd-noc-hash': this.props.files[1].documentHash
    };
    try {
          const response = await request({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: formData,
            url: '/uae/request_fewa_noc',
          });

          if (response.requested) {
            this.props.showNotification({
              content: 'Successfully requested FEWA NOC',
              type: 'success',
            });

            this.props.updateStep({ completed: true });
            this.props.push('/thank-you');
          } 

          else {
            console.log('response.requested is false')
          }
          

        } catch (error) {
              this.props.showNotification({
                  content: 'Failed to submit data. Please try again later',
                  type: 'error',
              });
         }
   
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
            FEWA NOC Form Request
          </Typography>

          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerNOCRequestForm);
