import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NetworkIcon from '@material-ui/icons/FilterTiltShift';
import OverviewIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

export default (
  <div>
    <Link to="/login">
      <ListItem button>
        <ListItemIcon>
          <OverviewIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </Link>
    <Link to="/rera/buyer-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S1: RERA Buyer Form" />
      </ListItem>
    </Link>

    <Link to="/rera/seller-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S2: RERA Seller Form" />
      </ListItem>
    </Link>
    <Link to="/rera/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>

        <ListItemText primary="S3: RERA Admin Form" />
      </ListItem>
    </Link>

    <Link to="/mpd/buyer-verification-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S4: MPD Buyer Verification Form" />
      </ListItem>
    </Link>

    <Link to="/mpd/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S5: MPD Admin Form" />
      </ListItem>
    </Link>

    <Link to="/fewa/buyer-noc-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S6: FEWA Buyer NOC Form" />
      </ListItem>
    </Link>

    <Link to="/fewa/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S7: FEWA Admin NOC Form" />
      </ListItem>
    </Link>

    <Link to="/moj/seller-noc-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S8: MOJ Seller NOC form" />
      </ListItem>
    </Link>

    <Link to="/moj/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S9: MOJ Admin NOC form" />
      </ListItem>
    </Link>

    <Link to="/abd/buyer-request-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S10: ABD Buyer Request Form" />
      </ListItem>
    </Link>

    <Link to="/abd/admin-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S11: ABD Admin Mortgage form" />
      </ListItem>
    </Link>

    <Link to="/rera/buyer-td-form">
      <ListItem button>
        <ListItemIcon>
          <NetworkIcon />
        </ListItemIcon>
        <ListItemText primary="S13: RERA Buyer TD Request Form" />
      </ListItem>
    </Link>
    
  </div>
);
