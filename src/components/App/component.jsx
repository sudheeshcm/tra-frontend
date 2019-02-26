import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from '@Styles/theme';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Route } from 'react-router-dom';
import Overview from '@Scenes/Overview';
import Networks from '@Scenes/Networks';
import LoginPage from '@Scenes/LoginPage';
import NewNetwork from '@Scenes/Networks/components/NewNetwork';
import Header from '@Components/Header';
import Footer from '@Components/Footer';
import PrivateRoute from '@Components/PrivateRoute';
import Notification from '@Components/Notification';
import Dialog from '@Components/Dialog';
import ReraBuyerForm from '@Root/scenes/RERA/BuyerRequestForm';
import ReraSellerForm from '@Root/scenes/RERA/SellerVerificationForm';
import ListItems from './components/ListItems';

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

function App(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <div className={classes.root}>
        <Header classes={classes.appBar} />
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{ListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <Route exact path="/" component={Overview} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/networks" component={Networks} />
          <Route path="/networks/new" component={NewNetwork} />
          <Route path="/rera/buyer-form" component={ReraBuyerForm} />
          <Route path="/rera/seller-form" component={ReraSellerForm} />
        </main>
        <Dialog />
        <Notification />
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
