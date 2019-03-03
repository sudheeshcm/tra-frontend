import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MultiDocumentViewer from '@Components/MultiDocumentViewer';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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


    //TODO: Change Scenario 13 API endpoint once documented
    try {
      const response = await request({
        method: 'POST',
        headers: { 'content-type': 'application/JSON' },
        data: formData,
        url: '/uae/request_moj_noc',
      });

      if (response.requested) {
        this.props.showNotification({
          content: 'Request for new Title Deed Submitted',
          type: 'success',
        });
      } else {
        this.props.showNotification({
          content: response.error,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error, 'error');

      this.props.showNotification({
        content: 'Request for new Title Deed Failed',
        type: 'error',
      });
    }
    this.props.updateStep({completed: true });
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
            RERA New TD Request
          </Typography>
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
            <Button variant="contained" color="primary" type="submit" onClick={this.submitData}>
              Confirm
            </Button>
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(BuyerTDRequestForm);
