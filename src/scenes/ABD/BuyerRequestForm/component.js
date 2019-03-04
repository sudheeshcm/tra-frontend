import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import multipleDocumentsFilled from '@Utils/validators/multipleDocumentsFilled';

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

class BuyerRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      propId: '',
      sellerId: '',
      sellerIBAN: '',
      buyerIBAN: '',
      buyerId: props.buyerId,
    };
  }

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
        title: 'FEWA NOC',
        required: true,
      },
      {
        title: 'MOJ NOC',
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

  submitData = async e => {
    e.preventDefault();
    const formData = {
      'ot-hash': this.props.files[0].documentHash,
      'mpd-noc-hash': this.props.files[1].documentHash,
      'fewa-noc-hash': this.props.files[2].documentHash,
      'moj-noc-hash': this.props.files[3].documentHash,
      amount: this.state.amount,
      'property-id': this.state.propId,
      'buyer-id': this.state.buyerId,
      'seller-id': this.state.sellerId,
      'seller-iban': this.state.sellerIBAN,
      'buyer-iban': this.state.sellerId,
    };
    try {
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: '/cb/request_mortgage',
      });

      if (response.requested) {
        this.props.showNotification({
          content: 'Successfully requested  Mortgage',
          type: 'success',
        });

        this.props.updateStep({ completed: true });
        this.props.push('/thank-you');
      } else {
        console.log('response.requested is false');
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
            ABD Form Request
          </Typography>

          <div>
            <FormControl>
              <TextField
                label="Amount"
                margin="dense"
                value={this.state.amount}
                onChange={this.onValueChange('amount')}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Property Id"
                margin="dense"
                value={this.state.propId}
                onChange={this.onValueChange('propId')}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Seller ID"
                margin="dense"
                value={this.state.sellerId}
                onChange={this.onValueChange('sellerId')}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Buyer ID"
                margin="dense"
                value={this.state.buyerId}
                onChange={this.onValueChange('buyerId')}
                disabled
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Seller IBAN"
                margin="dense"
                value={this.state.sellerIBAN}
                onChange={this.onValueChange('sellerIBAN')}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <TextField
                label="Buyer IBAN"
                margin="dense"
                value={this.state.buyerIBAN}
                onChange={this.onValueChange('buyerIBAN')}
                required
              />
            </FormControl>
          </div>
          <form className={classes.formActions} onSubmit={this.submitData}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={multipleDocumentsFilled(this.props.files, 4)}
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerRequestForm);
