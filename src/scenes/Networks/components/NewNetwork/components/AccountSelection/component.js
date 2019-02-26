import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { func, shape, arrayOf, string, number, bool } from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@Components/Tooltip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  formActions: {
    margin: '16px',
    textAlign: 'center',
  },
  accountsCard: {
    marginTop: '32px',
  },
  preFundedAccountsTable: {},
  accountsField: {},
  idCell: {
    maxWidth: '190px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 8px',
  },
  emptyCell: {
    paddingRight: '24px',
    borderBottom: 'none',
    padding: '8px',
    color: 'grey',
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {},
  chipFormControl: {
    margin: theme.spacing.unit,
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
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 550,
    },
  },
};

class AccountSelection extends Component {
  static propTypes = {
    validateForm: func.isRequired,
    // loading: bool,
    errors: shape({}).isRequired,
    classes: shape({}).isRequired,
    accounts: arrayOf(
      shape({
        id: string.isRequired,
        balance: number.isRequired,
      }),
    ),
    fetchAccounts: func.isRequired,
    isSubmitted: bool,
    handleNext: func.isRequired,
    basicDetails: shape({}),
    data: shape({}),
    theme: shape({}).isRequired,
  };

  static defaultProps = {
    // loading: false,
    accounts: [],
    isSubmitted: false,
    basicDetails: {
      isPrivate: true,
      algorithm: 'poa',
    },
    data: null,
  };

  constructor(props) {
    super(props);
    if (props.data) {
      this.state = { ...props.data };
    } else {
      this.state = {
        preFundedAccounts: [
          {
            id: Date.now().toString(),
            isNew: true,
            isEditing: true,
            balance: 0,
            amountToUse: 0,
          },
        ],
        authorizedAccounts: [],
      };
    }
  }

  componentDidMount() {
    this.props.fetchAccounts({ getNotified: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSubmitted !== prevProps.isSubmitted) {
      this.props.handleNext();
    }
  }

  handleChange = event => {
    this.setState({ authorizedAccounts: event.target.value });
  };

  onSelectAccount = index => e =>
    this.setState(({ preFundedAccounts }) => {
      const updatedList = [...preFundedAccounts];
      updatedList[index] = {
        ...this.props.accounts.find(account => account.id === e.target.value),
        amountToUse: 0,
        isNew: false,
        isEditing: true,
      };
      return { preFundedAccounts: updatedList };
    });

  onValueChange = (field, index) => ({ target }) => {
    this.setState(({ preFundedAccounts }) => {
      const updatedList = [...preFundedAccounts];
      updatedList[index] = {
        ...updatedList[index],
        [field]: target.value ? parseFloat(target.value, 10) : '',
      };
      return { preFundedAccounts: updatedList };
    });
  };

  submitData = () => {
    const { preFundedAccounts, authorizedAccounts } = this.state;
    const filteredList = preFundedAccounts.map(account => ({
      ...account,
      id: account.isNew ? null : account.id,
    }));
    this.props.validateForm({
      payload: { preFundedAccounts: filteredList, authorizedAccounts },
      stage: 'step1',
    });
  };

  deleteAccount = index => () =>
    this.setState(({ preFundedAccounts }) => {
      const updatedList = [...preFundedAccounts];
      updatedList.splice(index, 1);
      return { preFundedAccounts: updatedList };
    });

  toggleEditAccount = index => () =>
    this.setState(({ preFundedAccounts }) => {
      const updatedList = [...preFundedAccounts];
      updatedList[index].isEditing = !updatedList[index].isEditing;
      return { preFundedAccounts: updatedList };
    });

  addAccount = () =>
    this.setState(({ preFundedAccounts }) => {
      const updatedList = [...preFundedAccounts];
      updatedList.push({
        id: Date.now().toString(),
        balance: 0,
        amountToUse: 0,
        isEditing: true,
        isNew: true,
      });
      return { preFundedAccounts: updatedList };
    });

  getMenuItems = id => {
    const { accounts } = this.props;
    const { preFundedAccounts } = this.state;
    const addedAccountIds = [];
    preFundedAccounts.forEach(i => i.id !== id && addedAccountIds.push(i.id));
    const accountOptions = [];
    accounts.forEach(account => {
      if (!addedAccountIds.includes(account.id)) {
        accountOptions.push(
          <MenuItem key={account.id} value={account.id}>
            {account.id}
          </MenuItem>,
        );
      }
    });
    if (!accountOptions.length) {
      accountOptions.push(
        <MenuItem key="empty-item" value={null} disabled>
          No account details found
        </MenuItem>,
      );
    }
    return accountOptions;
  };

  render() {
    const { errors, classes, basicDetails, theme, accounts } = this.props;
    const { preFundedAccounts } = this.state;

    const isAccountsSkippable =
      !basicDetails.isPrivate && basicDetails.algorithm !== 'poa';

    return (
      <div className="new__newtwork__accounts__info">
        {basicDetails.isPrivate && (
          <Card className={classes.accountsCard}>
            <CardContent>
              <FormLabel>Pre Funded Accounts</FormLabel>
              <Table
                className={classNames(
                  classes.preFundedAccountsTable,
                  'table table--prefunded__accounts',
                )}
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.idCell}>
                      Account Address
                    </TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Ether to be used</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {preFundedAccounts.map((account, index) => (
                    <TableRow key={account.id}>
                      {!account.isEditing ? (
                        <Fragment>
                          <TableCell className={classes.idCell}>
                            <Tooltip title={account.id}>
                              <span>{account.id}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{account.balance} Ether</TableCell>
                          <TableCell
                            className={
                              errors.preFundedAccounts.customErrors &&
                              errors.preFundedAccounts.customErrors[index] &&
                              !errors.preFundedAccounts.customErrors[index]
                                .amountToUse.valid
                                ? 'account__error__field error'
                                : ''
                            }
                          >
                            {account.amountToUse || 0} Ether
                          </TableCell>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <TableCell className={classes.idCell}>
                            <FormControl className={classes.formControl}>
                              <Select
                                value={account.id}
                                required
                                onChange={this.onSelectAccount(index)}
                                error={
                                  errors.preFundedAccounts.customErrors &&
                                  errors.preFundedAccounts.customErrors[
                                    index
                                  ] &&
                                  !errors.preFundedAccounts.customErrors[index]
                                    .id.valid
                                }
                                className={classes.accountsField}
                              >
                                {this.getMenuItems(account.id)}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>{account.balance}</TableCell>
                          <TableCell>
                            <FormControl>
                              <TextField
                                margin="dense"
                                type="number"
                                className={classes.accountsField}
                                value={account.amountToUse}
                                onChange={this.onValueChange(
                                  'amountToUse',
                                  index,
                                )}
                                error={
                                  errors.preFundedAccounts.customErrors &&
                                  errors.preFundedAccounts.customErrors[
                                    index
                                  ] &&
                                  !errors.preFundedAccounts.customErrors[index]
                                    .amountToUse.valid
                                }
                                helperText={
                                  errors.preFundedAccounts.customErrors &&
                                  errors.preFundedAccounts.customErrors[
                                    index
                                  ] &&
                                  errors.preFundedAccounts.customErrors[index]
                                    .amountToUse.message
                                }
                              />
                            </FormControl>
                          </TableCell>
                        </Fragment>
                      )}
                      <TableCell>
                        {!account.isEditing ? (
                          <Button
                            variant="fab"
                            aria-label="Edit"
                            className="actions__button--edit"
                            onClick={this.toggleEditAccount(index)}
                          >
                            <EditIcon />
                          </Button>
                        ) : (
                          <Button
                            variant="fab"
                            aria-label="Save"
                            className="actions__button--edit"
                            onClick={this.toggleEditAccount(index)}
                            disabled={account.isNew}
                          >
                            <SaveIcon />
                          </Button>
                        )}
                        <Button
                          variant="fab"
                          aria-label="Delete"
                          className="actions__button--delete"
                          onClick={this.deleteAccount(index)}
                          disabled={preFundedAccounts.length === 1}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!preFundedAccounts.length && (
                    <TableRow>
                      <TableCell className={classes.emptyCell}>
                        No account details added yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                className={classes.addButton}
                onClick={this.addAccount}
              >
                Add Account
              </Button>
            </CardActions>
          </Card>
        )}
        {basicDetails.algorithm === 'poa' && (
          <Card className={classes.accountsCard}>
            <CardContent>
              <FormLabel>Authorized Accounts</FormLabel>

              <div>
                <FormControl className={classes.chipFormControl}>
                  <InputLabel htmlFor="select-multiple-chip">
                    Account IDs
                  </InputLabel>
                  <Select
                    multiple
                    value={this.state.authorizedAccounts}
                    onChange={this.handleChange}
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
                    {accounts.map(account => (
                      <MenuItem
                        key={account.id}
                        value={account.id}
                        style={{
                          fontWeight:
                            this.state.authorizedAccounts.indexOf(account) ===
                            -1
                              ? theme.typography.fontWeightRegular
                              : theme.typography.fontWeightMedium,
                        }}
                      >
                        {account.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        )}
        {isAccountsSkippable && (
          <Card>
            <CardContent>
              No account details to be selected for Public and non - Proof of
              Authority Network
            </CardContent>
          </Card>
        )}
        <div className={classes.formActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={
              isAccountsSkippable ? this.props.handleNext : this.submitData
            }
          >
            Submit Accounts
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AccountSelection);
