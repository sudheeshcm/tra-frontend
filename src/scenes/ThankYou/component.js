import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { dispatch} from '@rematch/core';
import { push } from 'connected-react-router';


import dataScenarios from '../../data.js';



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
    marginTop: theme.spacing.unit * 6,
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
    this.props.updateStep({step, completed: true});
    dispatch(push('/login'));
  };

  render() {
    const { classes } = this.props;
    const Theme = createMuiTheme({ palette: { primary: dataScenarios[this.props.stepDetails.step].primaryColor} });

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            THANK YOU! 
          </Typography>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <MuiThemeProvider theme={Theme}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  NEXT STEP
                </Button>
            </MuiThemeProvider>
          </form>
        </Paper>
      </main>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ThankYou);
