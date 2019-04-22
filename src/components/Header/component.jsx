import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { getState, dispatch } from '@rematch/core';
import dataScenarios from '../../data.js';

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
  };

  resetStorageAndStore = () => {
    localStorage.clear();
    dispatch.app.resetApp();
    dispatch.verify.resetVerify();
    dispatch.app.updateStep({ step: 1, completed: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes}>
        <Toolbar>
          <Link
            className={`link header__wrapper ${
              dataScenarios[getState().app.stepDetails.step].entity
            }`}
            to="/login"
            data-test-id="header__home"
          >
            <img
              className={`header__logo ${
                dataScenarios[getState().app.stepDetails.step].entity
              }`}
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
              style={{ cursor: 'pointer' }}
            >
              - Property Ownership transfer Demo
            </Typography>
          </Link>
          <div className="header__links">
            <a
              href="http://52.172.209.140"
              target="_blank"
              className={`header__link ${
                dataScenarios[getState().app.stepDetails.step].entity
              }`}
            >
              {' '}
              Chain 1 Explorer
            </a>
            <a
              href="http://52.172.189.246/"
              target="_blank"
              className={`header__link ${
                dataScenarios[getState().app.stepDetails.step].entity
              }`}
            >
              {' '}
              MainNet Explorer
            </a>
            <a
              href="http://52.172.215.29/"
              target="_blank"
              className={`header__link ${
                dataScenarios[getState().app.stepDetails.step].entity
              }`}
            >
              {' '}
              CentralBank Explorer
            </a>
          </div>
          <img
            className={`header__entity ${
              dataScenarios[getState().app.stepDetails.step].entity
            }`}
            src={dataScenarios[getState().app.stepDetails.step].src}
            alt="entity"
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
