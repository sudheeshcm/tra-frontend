import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';
import defaultTheme from '@Styles/theme';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Route } from 'react-router-dom';
import LoginPage from '@Scenes/LoginPage';
import ThankYou from '@Scenes/ThankYou';
import Header from '@Components/Header';
import Footer from '@Components/Footer';
import PrivateRoute from '@Components/PrivateRoute';
import Notification from '@Components/Notification';
import Dialog from '@Components/Dialog';
import ReraBuyerForm from '@Root/scenes/RERA/BuyerRequestForm';
import ReraSellerForm from '@Root/scenes/RERA/SellerVerificationForm';
import FewaBuyerNocForm from '@Root/scenes/FEWA/BuyerNOCRequestForm';
import ABDBuyerRequestForm from '@Root/scenes/ABD/BuyerRequestForm';
import ABDAdminApprovalForm from '@Root/scenes/ABD/AdminApprovalForm';
import ENBDAdminApprovalForm from '@Root/scenes/ENBD/AdminApprovalForm';
import FewaAdminApprovalForm from '@Root/scenes/FEWA/AdminNOCRequestForm';
import MojSellerNocForm from '@Root/scenes/MOJ/SellerNOCRequestForm';
import MojAdminApprovalForm from '@Root/scenes/MOJ/AdminApprovalForm';
import ReraAdminApprovalForm from '@Root/scenes/RERA/AdminApprovalForm';
import MPDAdminApprovalForm from '@Root/scenes/MPD/AdminApprovalForm';
import MPDBuyerVerificationForm from '@Root/scenes/MPD/BuyerVerificationForm';
import BuyerTDUploadForm from '@Root/scenes/FEWA/BuyerTDUploadForm';
import { getState } from '@rematch/core';
import BuyerTDRequestForm from '@Root/scenes/RERA/BuyerTDRequestForm';
import AdminTDApprovalForm from '@Root/scenes/RERA/AdminTDApprovalForm';
import ListItems from './components/ListItems';
import dataScenarios from '../../data.js';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    boxSizing: 'border-box',
  },
  toolbar: theme.mixins.toolbar,
  input: {
    backgroundColor: 'blue',
    color: 'yellow',
    width: '350px',
  },
});

class App extends React.Component {
  componentDidMount() {
    if (localStorage.state) {
      this.props.setAppState(JSON.parse(localStorage.state));
    }

    if (localStorage.curretUser) {
      this.props.loginUser(JSON.parse(localStorage.curretUser));
    }

    if (this.props.location.pathname === '/') {
      this.props.push('/login');
    }
  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(getState().app);
  }

  render() {
    const { classes } = this.props;
    const Theme = createMuiTheme({
      ...defaultTheme,
      palette: {
        primary: dataScenarios[this.props.stepDetails.step].primaryColor,
      },
    });

    return (
      <MuiThemeProvider theme={Theme}>
        <div className={classes.root}>
          <Header classes={classes.appBar} />
          {/* <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <List>{ListItems}</List>
          </Drawer> */}
          <main className={classes.content}>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/thank-you" component={ThankYou} />

            <PrivateRoute path="/rera/buyer-form" render={<ReraBuyerForm />} />
            <PrivateRoute path="/rera/seller-form" component={ReraSellerForm} />
            <PrivateRoute
              path="/rera/admin-form"
              component={ReraAdminApprovalForm}
            />
            {/* S1, S2, S3 */}

            <PrivateRoute
              path="/mpd/buyer-verification-form"
              component={MPDBuyerVerificationForm}
            />
            <PrivateRoute
              path="/mpd/admin-form"
              component={MPDAdminApprovalForm}
            />
            {/* S4, S5 */}

            <PrivateRoute
              path="/fewa/buyer-noc-form"
              component={FewaBuyerNocForm}
            />
            <PrivateRoute
              path="/fewa/admin-form"
              component={FewaAdminApprovalForm}
            />
            {/* S6, S7 */}

            <PrivateRoute
              path="/moj/seller-noc-form"
              component={MojSellerNocForm}
            />
            <PrivateRoute
              path="/moj/admin-form"
              component={MojAdminApprovalForm}
            />
            {/* S8, S9 */}

            <PrivateRoute
              path="/abd/buyer-request-form"
              component={ABDBuyerRequestForm}
            />
            <PrivateRoute
              path="/abd/admin-form"
              component={ABDAdminApprovalForm}
            />
            {/* S10, S11 */}

            <PrivateRoute
              path="/enbd/admin-form"
              component={ENBDAdminApprovalForm}
            />
            {/* S12 */}

            <PrivateRoute
              path="/rera/buyer-td-form"
              component={BuyerTDRequestForm}
            />
            <PrivateRoute
              path="/rera/admin-td-form"
              component={AdminTDApprovalForm}
            />
            {/* S13, S14 */}

            <PrivateRoute
              path="/fewa/buyer-form"
              component={BuyerTDUploadForm}
            />
            {/* S15 */}
          </main>
          <Dialog />
          <Notification />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
