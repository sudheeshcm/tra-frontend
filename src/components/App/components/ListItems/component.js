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
  </div>
);
