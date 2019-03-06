import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import dataScenarios from '../../data.js';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import dataScenarios from '../../data.js';



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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: '',
    };
  }

  // componentDidMount() {
  //   this.props.fetchDiplomas(99);
  // }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.stopPropagation();
    event.preventDefault();
    const { id, password } = this.state;
    const loginPayload = {
      id,
      password,
    };
    this.props.login(loginPayload);
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${dataScenarios[this.props.stepDetails.step].actor} Sign in`}
          </Typography>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="id">Id</InputLabel>
              <Input
                id="id"
                name="id"
                autoComplete="id"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginPage);
