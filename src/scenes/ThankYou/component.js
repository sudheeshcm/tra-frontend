import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { dispatch } from '@rematch/core';
import { push } from 'connected-react-router';
import { getState } from '@rematch/core';
import ArrowForward from '@material-ui/icons/ArrowForward';


import dataScenarios from '../../data.js';
import { isAbsolute } from 'upath';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
      position: 'absolute',
      bottom: '60px',
      right: '80px',
  },
   nextMsg: {
    fontSize: 17,
    fontWeight: '200',
  //   textAlign: 'center',
    fontFamily: "museo-sans",
    lineHeight: 1.5,
    fontWeight: 300,
  
   },
   icon: {
    width: 90,
    height: 60,
    cursor:'pointer',

   },
   Msgs: {
    marginTop: '2px' ,
   },
   footer: {
    bottom: '70px',
    fontWeight: '500',
    fontSize: '20px',
    position: 'absolute',
    left: '45%',
  },
  
});

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit = event => {
    event.stopPropagation();
    event.preventDefault();
    var step = this.props.stepDetails.step;
    ++step;
    this.props.updateStep({ step });
    this.props.logout();
    dispatch(push('/login'));
  };

  render() {
    const { classes, stepDetails } = this.props;

    let nextStep;

    if (stepDetails.step < 14) {
      nextStep = (
          <p
            onClick={this.handleFormSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <ArrowForward className={classes.icon}/>
          </p>

      );
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            THANK YOU!
          </Typography>
         
          <div className={classes.Msgs} >
            { dataScenarios[getState().app.stepDetails.step].nextMsg.map((msg, index) => (
              <p className={classes.nextMsg}>{msg}</p>
            ))}
        </div>
      
        </Paper>
        <div>{nextStep}</div>
      </main>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ThankYou);
