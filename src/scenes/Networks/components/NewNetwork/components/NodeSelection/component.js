import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { func, shape, arrayOf, string, number, bool } from 'prop-types';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  formActions: {
    margin: '16px',
    textAlign: 'center',
  },
  nodesCard: {
    marginTop: '32px',
  },
  addButton: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    marginTop: '16px',
  },
  formControlSelect: {
    marginTop: '16px',
    marginBottom: '-10px',
  },
  chipFormControl: {
    margin: theme.spacing.unit,
    marginTop: '16px',
    minWidth: 300,
    maxWidth: 500,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    border: '1px solid lightgrey',
    borderRadius: '4px',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    display: 'block',
  },
  nestedItem: {
    margin: 'auto',
    maxWidth: '500px',
  },
  deleteIcon: {
    marginRight: '8px',
    '&:hover': {
      color: 'red',
    },
    '&:disabled': {
      color: 'lightgrey',
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

const services = [
  'admin',
  'db',
  'debug',
  'eth',
  'miner',
  'net',
  'personal',
  'shh',
  'txpool',
  'web3',
];

class NodesSelection extends Component {
  static propTypes = {
    validateForm: func.isRequired,
    classes: shape({}).isRequired,
    accounts: arrayOf(
      shape({
        id: string.isRequired,
        balance: number.isRequired,
      }),
    ),
    fetchAccounts: func.isRequired,
    basicDetails: shape({}),
    data: shape({}),
    theme: shape({}).isRequired,
    isAllSubmitted: bool,
  };

  static defaultProps = {
    accounts: [],
    basicDetails: {
      isPrivate: true,
      algorithm: 'poa',
    },
    data: null,
    isAllSubmitted: false,
  };

  constructor(props) {
    super(props);
    if (props.data) {
      this.state = { ...props.data };
    } else {
      const tempId = Date.now();
      this.state = {
        openId: tempId,
        nodes: [
          {
            id: tempId,
            isNew: true,
            client: '',
            isMining: true,
            minerAccount: '',
            isHTTPRPCServer: false,
            HTTPRPCServices: [],
            isWebSocketRPCServer: false,
            WebSocketRPCServices: [],
            accountsToImport: [],
          },
        ],
      };
    }
  }

  componentDidMount() {
    this.props.fetchAccounts({ getNotified: false });
  }

  onValueChange = (field, index) => ({ target }) => {
    this.setState(({ nodes }) => {
      const updatedList = [...nodes];
      updatedList[index] = {
        ...updatedList[index],
        [field]: target.value ? target.value : '',
      };
      return { nodes: updatedList };
    });
  };

  submitData = () => {
    const { nodes } = this.state;
    const filteredList = nodes.map(node => ({
      ...node,
      id: node.isNew ? null : node.id,
    }));
    this.props.validateForm({
      payload: { nodes: filteredList },
      stage: 'step2',
    });
  };

  deleteNode = index => () =>
    this.setState(({ nodes }) => {
      const updatedList = [...nodes];
      updatedList.splice(index, 1);
      return { nodes: updatedList };
    });

  toggleSwitch = (field, index) => () =>
    this.setState(({ nodes }) => {
      const updatedList = [...nodes];
      updatedList[index][field] = !updatedList[index][field];
      return { nodes: updatedList };
    });

  addNode = () =>
    this.setState(({ nodes }) => {
      const updatedList = [...nodes];
      updatedList.push({
        id: Date.now(),
        isNew: true,
        isEditing: true,
        client: '',
        isMining: true,
        minerAccount: '',
        isHTTPRPCServer: false,
        HTTPRPCServices: [],
        isWebSocketRPCServer: false,
        WebSocketRPCServices: [],
        accountsToImport: [],
      });
      return { nodes: updatedList };
    });

  handleClick = id => () => {
    this.setState(state => ({ openId: state.openId === id ? null : id }));
  };

  render() {
    const { classes, basicDetails, theme, accounts } = this.props;
    const { nodes, openId } = this.state;

    const isAlgoProofs = ['poa', 'pow', 'pos'].includes(basicDetails.algorithm);
    const isAlgoRaftOrIBFT = ['ibft', 'raft'].includes(basicDetails.algorithm);

    const accountOptions = [];
    accounts.forEach(account => {
      accountOptions.push(
        <MenuItem key={account.id} value={account.id}>
          {account.id}
        </MenuItem>,
      );
    });
    if (!accountOptions.length) {
      accountOptions.push(
        <MenuItem key="empty-item" value={null} disabled>
          No account details found
        </MenuItem>,
      );
    }

    return (
      <div className="new__newtwork__nodes__info">
        <Card className={classes.nodesCard}>
          <CardContent>
            <FormLabel>Nodes</FormLabel>
            <div>
              <List component="nav">
                {nodes.map((node, index) => (
                  <Fragment key={node.id}>
                    <ListItem
                      button
                      id={node.id}
                      onClick={this.handleClick(node.id)}
                      selected={openId === node.id}
                    >
                      <strong>{index + 1}.</strong>
                      <ListItemText
                        inset
                        primary="Node"
                        secondary={`Client: ${node.client || 'Not selected'}`}
                      />
                      {openId === node.id ? (
                        <Fragment>
                          {nodes.length > 1 && (
                            <DeleteIcon
                              className={classes.deleteIcon}
                              onClick={this.deleteNode(index)}
                            />
                          )}
                          <SaveIcon />
                        </Fragment>
                      ) : (
                        <EditIcon />
                      )}
                    </ListItem>
                    <Collapse
                      in={openId === node.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                          <div className={classes.nestedItem}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="client">Client</InputLabel>
                              <Select
                                value={node.client}
                                required
                                onChange={this.onValueChange('client', index)}
                                error={false}
                                className={classes.accountsField}
                              >
                                <MenuItem
                                  key="geth"
                                  value="geth"
                                  disabled={!isAlgoProofs}
                                >
                                  Go Ethereum
                                </MenuItem>
                                <MenuItem
                                  key="parityeth"
                                  value="parityeth"
                                  disabled={!isAlgoProofs}
                                >
                                  Parity Ethereum
                                </MenuItem>
                                <MenuItem
                                  key="jpmquorum"
                                  value="jpmquorum"
                                  disabled={!isAlgoRaftOrIBFT}
                                >
                                  JPM Quorum
                                </MenuItem>
                                <MenuItem
                                  key="pantheon"
                                  value="pantheon"
                                  disabled={!isAlgoRaftOrIBFT}
                                >
                                  ConsenSys Pantheon
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl className={classes.formControlSelect}>
                              <FormControlLabel
                                label="Mining"
                                control={
                                  <Switch
                                    checked={node.isMining}
                                    onClick={this.toggleSwitch(
                                      'isMining',
                                      index,
                                    )}
                                    color="primary"
                                  />
                                }
                              />
                            </FormControl>
                            {node.isMining && (
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="minerAccount">
                                  Miner Account
                                </InputLabel>
                                <Select
                                  value={node.minerAccount}
                                  required
                                  onChange={this.onValueChange(
                                    'minerAccount',
                                    index,
                                  )}
                                  className={classes.nodesField}
                                >
                                  {accountOptions}
                                </Select>
                              </FormControl>
                            )}
                            {node.isMining && (
                              <FormControl
                                className={classes.formControlSelect}
                              >
                                <FormControlLabel
                                  label="HTTP RPC Server"
                                  control={
                                    <Switch
                                      checked={node.isHTTPRPCServer}
                                      onClick={this.toggleSwitch(
                                        'isHTTPRPCServer',
                                        index,
                                      )}
                                      color="primary"
                                    />
                                  }
                                />
                              </FormControl>
                            )}
                            {node.isHTTPRPCServer && (
                              <FormControl className={classes.chipFormControl}>
                                <InputLabel htmlFor="select-multiple-chip">
                                  HTTP RPC Services
                                </InputLabel>
                                <Select
                                  multiple
                                  value={node.HTTPRPCServices}
                                  onChange={this.onValueChange(
                                    'HTTPRPCServices',
                                    index,
                                  )}
                                  input={<Input id="select-multiple-chip" />}
                                  renderValue={selected => (
                                    <div className={classes.chips}>
                                      {selected.map(value => (
                                        <Chip
                                          key={value}
                                          label={value}
                                          className={classes.chip}
                                        />
                                      ))}
                                    </div>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                  {services.map(item => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      style={{
                                        fontWeight:
                                          node.HTTPRPCServices.indexOf(item) ===
                                          -1
                                            ? theme.typography.fontWeightRegular
                                            : theme.typography.fontWeightMedium,
                                      }}
                                    >
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                            <FormControl className={classes.formControlSelect}>
                              <FormControlLabel
                                label="Web Socket RPC Server"
                                control={
                                  <Switch
                                    checked={node.isWebSocketRPCServer}
                                    onClick={this.toggleSwitch(
                                      'isWebSocketRPCServer',
                                      index,
                                    )}
                                    color="primary"
                                  />
                                }
                              />
                            </FormControl>
                            {node.isWebSocketRPCServer && (
                              <FormControl className={classes.chipFormControl}>
                                <InputLabel htmlFor="select-multiple-chip">
                                  Web Socket RPC Services
                                </InputLabel>
                                <Select
                                  multiple
                                  value={node.WebSocketRPCServices}
                                  onChange={this.onValueChange(
                                    'WebSocketRPCServices',
                                    index,
                                  )}
                                  input={<Input id="select-multiple-chip" />}
                                  renderValue={selected => (
                                    <div className={classes.chips}>
                                      {selected.map(value => (
                                        <Chip
                                          key={value}
                                          label={value}
                                          className={classes.chip}
                                        />
                                      ))}
                                    </div>
                                  )}
                                  MenuProps={MenuProps}
                                >
                                  {services.map(item => (
                                    <MenuItem
                                      key={item}
                                      value={item}
                                      style={{
                                        fontWeight:
                                          node.WebSocketRPCServices.indexOf(
                                            item,
                                          ) === -1
                                            ? theme.typography.fontWeightRegular
                                            : theme.typography.fontWeightMedium,
                                      }}
                                    >
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          </div>
                        </ListItem>
                      </List>
                    </Collapse>
                  </Fragment>
                ))}
              </List>
              {!nodes.length && <div>No node details added yet</div>}
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={this.addNode}
            >
              Add Node
            </Button>
          </CardActions>
        </Card>

        <div className={classes.formActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitData}
            disabled={!this.props.isAllSubmitted}
          >
            Submit Details
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NodesSelection);
