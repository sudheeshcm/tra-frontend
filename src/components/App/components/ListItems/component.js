import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NetworkIcon from '@material-ui/icons/FilterTiltShift';
import OverviewIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

export default (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <OverviewIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
    </Link>
    <Link to="/networks">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="Networks" />
      </ListItem>
    </Link>
    <Link to="/rera/buyer-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="RERA Buyer Form" />
      </ListItem>
    </Link>

    <Link to="/rera/seller-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="RERA Seller Form" />
      </ListItem>
    </Link>
    <Link to="/rera/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>

        <ListItemText primary="RERA Admin Form" />
      </ListItem>
    </Link>

    <Link to="/mpd/buyer-verification-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="MPD Buyer Verification Form" />
      </ListItem>
    </Link>


    <Link to="/mpd/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="MPD Admin Form" />
      </ListItem>
    </Link>
    
    <Link to="/fewa/buyer-noc-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="FEWA Buyer NOC Form" />
      </ListItem>
    </Link>

    <Link to="/fewa/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="FEWA Admin NOC Form" />
      </ListItem>
    </Link>

    <Link to="/moj/seller-noc-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="MOJ Seller NOC form" />
      </ListItem>
    </Link>

    <Link to="/moj/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="MOJ Admin NOC form" />
      </ListItem>
    </Link>


    <Link to="/abd/buyer-request-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="ABD Buyer Request Form" />
      </ListItem>
    </Link>

  </div>
);
