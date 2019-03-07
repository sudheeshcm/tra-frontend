import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import dataScenarios from '../../data.js';
import { getState, dispatch } from '@rematch/core';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
  };

  resetStorageAndStore = () => {
    localStorage.clear();
    dispatch.app.resetApp();
    dispatch.app.updateStep({ step: 1, completed: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes}>
        <Toolbar>
          <Link
            className={`link header__wrapper ${dataScenarios[getState().app.stepDetails.step].entity}`}
            to="/login"
            data-test-id="header__home"
          >
            <img
              className={`header__logo ${dataScenarios[getState().app.stepDetails.step].entity}`}
              src="/static/img/TRA-white.png"
              alt="logo"
              onClick={this.resetStorageAndStore}
            />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className="header__title"
              onClick={this.resetStorageAndStore}
              style={{ 'cursor': 'pointer' }}
            >
              - DTP PoC
            </Typography>
            <img
              className={`header__entity ${dataScenarios[getState().app.stepDetails.step].entity}`}
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
