import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Overview extends Component {
  render() {
    return (
      <div className="overview__contents__wrapper">
        <Typography variant="display2">Overview</Typography>
        <p>
        Telecommunication Regulatory Authority Application
        </p>
      </div>
    );
  }
}
