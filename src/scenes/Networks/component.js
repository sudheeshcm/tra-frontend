import React, { Component } from 'react';
import { shape, arrayOf } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

export default class Networks extends Component {
  static propTypes = {
    networks: arrayOf(shape({})),
  };

  static defaultProps = {
    networks: [],
  };

  render() {
    const { networks } = this.props;
    return (
      <div className="network__contents__wrapper">
        <Typography variant="display1">Network</Typography>
        <p>Ethereum blockchain networks</p>
        <Link to="/networks/new">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '1em' }}
          >
            Create New Network
          </Button>
        </Link>
        <Link to="/networks/join">
          <Button variant="contained" color="secondary">
            Join Existing Network
          </Button>
        </Link>
        <div>
          <Paper style={{ marginTop: '1.5em' }}>
            <Table className="table table--network">
              <TableHead>
                <TableRow>
                  <TableCell>Network Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Consensus Algorithm</TableCell>
                  <TableCell>Number of Nodes</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {networks.map(network => (
                  <TableRow key={network.name}>
                    <TableCell>{network.name}</TableCell>
                    <TableCell>
                      {network.isPrivate ? 'Private' : 'Public'}
                    </TableCell>
                    <TableCell>{network.algorithm}</TableCell>
                    <TableCell>{network.numberOfNodes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}
