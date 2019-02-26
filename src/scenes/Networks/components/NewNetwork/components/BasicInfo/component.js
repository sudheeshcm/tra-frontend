import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { func, shape, bool } from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = () => ({
  title: {
    fontWeight: '500',
    fontSize: '20px',
  },
  formActions: {
    marginTop: '32px',
    textAlign: 'center',
  },
  infoCard: {
    marginTop: '32px',
    padding: '30px',
  },
  advancedButton: {
    marginRight: '8px',
    width: '160px',
    border: '1px solid lightgrey',
  },
});

class BasicInfo extends Component {
  static propTypes = {
    validateForm: func.isRequired,
    errors: shape({}).isRequired,
    classes: shape({}).isRequired,
    handleNext: func.isRequired,
    isSubmitted: bool,
    data: shape({}),
  };

  static defaultProps = {
    isSubmitted: false,
    data: null,
  };

  constructor(props) {
    super(props);
    if (props.data) {
      this.state = { ...props.data };
    } else {
      this.state = {
        name: '',
        isPrivate: true,
        algorithm: 'pow',
        numberOfNodes: 0,
        blockTime: 15,
        isAdvancedSectionOpen: true,
        networkId: Math.floor(Math.random() * 100000 + 1),
      };
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSubmitted !== prevProps.isSubmitted) {
      this.props.handleNext();
    }
  }

  onValueChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  toggleIsPrivate = () =>
    this.setState(({ isPrivate }) => ({
      isPrivate: !isPrivate,
    }));

  toggleAdvancedSection = () =>
    this.setState(({ isAdvancedSectionOpen }) => ({
      isAdvancedSectionOpen: !isAdvancedSectionOpen,
    }));

  submitData = () => {
    this.props.validateForm({ payload: this.state, stage: 'step0' });
  };

  render() {
    const { errors, classes } = this.props;

    return (
      <div className="new__newtwork__basic__info">
        <Card className={classes.infoCard}>
          <CardContent>
            <FormLabel>Basic Information</FormLabel>
            <Fragment>
              <div>
                <FormControl>
                  <TextField
                    label="Network Name"
                    margin="dense"
                    value={this.state.name}
                    onChange={this.onValueChange('name')}
                    error={!errors.name.valid}
                    helperText={errors.name.message}
                    required
                  />
                </FormControl>
              </div>

              <div>
                <FormControl style={{ minWidth: '300px', marginTop: '1em' }}>
                  <FormControlLabel
                    label="Private Network"
                    control={
                      <Switch
                        checked={this.state.isPrivate}
                        onClick={this.toggleIsPrivate}
                        color="primary"
                      />
                    }
                  />
                </FormControl>
              </div>

              <div>
                <FormControl style={{ minWidth: '300px', marginTop: '1em' }}>
                  <InputLabel htmlFor="consensus">
                    Consensus Algorithm
                  </InputLabel>
                  <Select
                    value={this.state.algorithm}
                    required
                    inputProps={{ id: 'consensus' }}
                    onChange={this.onValueChange('algorithm')}
                    error={!errors.algorithm.valid}
                  >
                    <MenuItem value="pow">Proof of Work</MenuItem>
                    <MenuItem value="poa">Proof of Authority</MenuItem>
                    <MenuItem value="pos" disabled>
                      Proof of Stake
                    </MenuItem>
                    <MenuItem value="raft" disabled={!this.state.isPrivate}>
                      Raft
                    </MenuItem>
                    <MenuItem value="ibft" disabled={!this.state.isPrivate}>
                      IBFT
                    </MenuItem>
                  </Select>
                  <FormHelperText id="component-error-text" error>
                    {errors.algorithm.message}
                  </FormHelperText>
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <TextField
                    label="Number of Nodes"
                    margin="dense"
                    required
                    value={this.state.numberOfNodes}
                    error={!errors.numberOfNodes.valid}
                    helperText={
                      errors.numberOfNodes.message ||
                      'For use case development, use small number of nodes.'
                    }
                    onChange={this.onValueChange('numberOfNodes')}
                  />
                </FormControl>
              </div>
            </Fragment>
            <Collapse
              in={this.state.isAdvancedSectionOpen}
              timeout="auto"
              unmountOnExit
            >
              <FormControl>
                <TextField
                  label="Network ID"
                  margin="dense"
                  type="number"
                  value={this.state.networkId}
                  onChange={this.onValueChange('networkId')}
                  error={!errors.networkId.valid}
                  helperText={
                    errors.networkId.message || '"Network numerical identifier"'
                  }
                />
              </FormControl>
              {this.state.algorithm === 'poa' && (
                <div>
                  <FormControl>
                    <TextField
                      label="Block time"
                      margin="dense"
                      type="number"
                      value={this.state.blockTime}
                      onChange={this.onValueChange('blockTime')}
                      error={!errors.blockTime.valid}
                      helperText={
                        errors.blockTime.message ||
                        '"How many seconds should pass between block generation ?"'
                      }
                    />
                  </FormControl>
                </div>
              )}
            </Collapse>
            <div className={classes.formActions}>
              {/* <Button
                onClick={this.toggleAdvancedSection}
                className={classes.advancedButton}
              >
                {this.state.isAdvancedSectionOpen ? 'Hide ' : 'Show '} Advanced
              </Button> */}

              <Button
                variant="contained"
                color="primary"
                onClick={this.submitData}
              >
                Submit Details
              </Button>
            </div>
          </CardContent>
          <CardActions />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(BasicInfo);
