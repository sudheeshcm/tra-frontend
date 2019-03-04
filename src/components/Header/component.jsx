import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import dataScenarios from '../../data.js';
import { getState } from '@rematch/core';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes}>
        <Toolbar>
          <Link
            className="link header__wrapper"
            to="/"
            data-test-id="header__home"
          >
            <img
              className="header__logo"
              src="/static/img/consensys.png"
              alt="logo"
            />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className="header__title"
            >
              TRA - UAE PASS
            </Typography>
            <img
              className="header__entity"
              src={dataScenarios[getState().app.stepDetails.step].src}
              alt="entity"
            />
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
