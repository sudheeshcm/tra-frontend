import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { func, shape, bool } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import BasicInfo from './components/BasicInfo';
import AccountSelection from './components/AccountSelection';
import NodeSelection from './components/NodeSelection';

const styles = () => ({
  stepper: {
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  },
});

function getSteps() {
  return [
    'Create Networks - Basic Info',
    'Select Pre Funded Accounts',
    'Select Nodes',
  ];
}

const fieldGroups = {
  step0: ['name', 'algorithm', 'numberOfNodes', 'networkId', 'blockTime'],
  step1: ['preFundedAccounts'],
  step2: ['nodes'],
};

class NewNetwork extends Component {
  static propTypes = {
    validateForm: func.isRequired,
    // loading: bool,
    errors: shape({}).isRequired,
    classes: shape({}).isRequired,
    step0: shape({ submitted: bool }).isRequired,
    step1: shape({ submitted: bool }).isRequired,
    step2: shape({ submitted: bool }).isRequired,
  };

  static defaultProps = {
    // loading: false,
  };

  state = {
    activeStep: 0,
  };

  isStepFailed = stepCount => {
    const { errors } = this.props;
    let isError = false;
    Object.keys(errors).forEach(key => {
      if (fieldGroups[`step${stepCount}`].includes(key) && !errors[key].valid) {
        isError = true;
      }
    });
    return isError;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isCompleted = index => {
    const stepName = `step${index}`;
    return this.props[stepName].submitted;
  };

  getStepContent = (step, handleNext) => {
    const props = { handleNext };
    switch (step) {
      case 0:
        return <BasicInfo {...props} />;
      case 1:
        return <AccountSelection {...props} />;
      case 2:
        return <NodeSelection {...props} />;
      default:
        return 'Unknown step';
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();

    return (
      <div className="new__network__wrapper">
        <Typography variant="display1">Create New Network</Typography>
        <p>Create new Blockchain network.</p>
        <div>
          <div className="new__networks__main__content">
            <Stepper
              nonLinear
              activeStep={activeStep}
              className={classes.stepper}
            >
              {steps.map((label, index) => {
                const props = {};
                const labelProps = {};
                if (this.isStepFailed(index)) {
                  labelProps.optional = (
                    <Typography variant="caption" color="error">
                      Contains errors, please review.
                    </Typography>
                  );
                }
                if (this.isCompleted(index)) {
                  labelProps.completed = true;
                }
                return (
                  <Step key={label} {...props} onClick={this.handleStep(index)}>
                    <StepButton {...labelProps}>{label}</StepButton>
                  </Step>
                );
              })}
            </Stepper>
            <Fragment>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&quot;re finished
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div
                  className={classNames(classes.formContent, 'form__content')}
                >
                  {this.getStepContent(activeStep, this.handleNext)}
                </div>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewNetwork);
