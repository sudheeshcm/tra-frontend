import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import request from '@Services/ApiService';

const styles = () => ({
  title: {
    fontWeight: '500',
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '100px',
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
    textAlign: 'center',
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
      sellerId: '',
      propId: '',
      buyerId: props.buyerId,
    };
  }

  onValueChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  submitData = async e => {
    e.preventDefault();
    const { sellerId, propId, buyerId } = this.state;
    console.log('sellerId, propId, buyerId: ', sellerId, propId, buyerId);

    const formData = {
      'from': sellerId,
      'to': buyerId ,
      'property-id': propId
    };

    try {
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: formData,
        url: 'http://7fe767ba.ngrok.io/ajman/request_ot',

      });
      console.log(response)
      console.log(response["ot-hash"])
      this.props.setOtHash(response["ot-hash"]);
      this.props.getPDF(response["ot-hash"]);

    } catch (error) {
      console.log(error, 'error');
    }
    
    this.props.updateStep({ completed: true });
    this.props.push('/thank-you');
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="buyer-request-form">
        <Typography variant="h6" className={classes.title}>
          RERA - Buyer Request
        </Typography>
        <Card className={classes.infoCard}>
          <CardContent>
            <FormLabel>Purchase Information</FormLabel>
            <form onSubmit={this.submitData}>
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
                    label="Property ID"
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
                    label="Buyer ID"
                    margin="dense"
                    value={this.state.buyerId}
                    onChange={this.onValueChange('buyerId')}
                    disabled
                    required
                  />
                </FormControl>
              </div>
              <div className={classes.formActions}>
                <Button variant="contained" color="primary" type="submit">
                  Submit Details
                </Button>
              </div>
            </form>
          </CardContent>
          <CardActions />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(BuyerRequestForm);
