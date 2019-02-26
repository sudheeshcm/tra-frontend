import { dispatch } from '@rematch/core';
// import request from '@Services/ApiService';
import { push } from 'connected-react-router';

import { VALIDATORS } from '@Utils/validations';
import { getInitialErrorState, validateForm } from '@Utils/index';
import duplicateChecker from '@Utils/validators/duplicateChecker';
import getStateVariables from '@Utils/getStateVariable';

const maxLength = length => (value, message) => ({
  valid: value.length <= length,
  message:
    value.length <= length
      ? ''
      : message || 'Does not match the length criteria',
});
const { alphaNumericArabicSpace, required } = VALIDATORS;

const BasicInfoModel = {
  name: [
    required,
    {
      message: 'Cannot contain more that 15 characters',
      validator: maxLength(30),
    },
    {
      message: 'Invalids characters are not allowed',
      validator: alphaNumericArabicSpace,
    },
    {
      message: 'This network has already been added',
      validator: duplicateChecker('!==', 'name'),
      getStateVarFunc: () =>
        getStateVariables({
          model: 'networks',
          field: 'items',
        }),
    },
  ],
  algorithm: [required],
  numberOfNodes: [required],
  networkId: [
    required,
    {
      message: 'This network id has already been added',
      validator: duplicateChecker('!==', 'networkId'),
      getStateVarFunc: () =>
        getStateVariables({
          model: 'networks',
          field: 'items',
        }),
    },
  ],
  blockTime: [],
};

const NetworkAccountsModel = {
  preFundedAccounts: [],
};

const NetworkNodesModel = {
  nodes: [],
};

export const initialState = {
  loading: false,
  _errors: {
    ...getInitialErrorState(BasicInfoModel),
    ...getInitialErrorState(NetworkAccountsModel),
  },
  step0: {
    submitted: false,
  },
  step1: {
    submitted: false,
  },
  step2: {
    submitted: false,
  },
};

export default {
  state: initialState,
  reducers: {
    setFormErrors: (state, errors) => ({
      ...state,
      _errors: errors,
    }),
    resetFormErrors: state => ({
      ...state,
      _errors: {
        ...getInitialErrorState(BasicInfoModel),
        ...getInitialErrorState(NetworkAccountsModel),
      },
    }),
    submitData: (state, { payload, stage }) => ({
      ...state,
      loading: true,
      [stage]: {
        ...state[stage],
        submitted: true,
        data: payload,
      },
    }),

    submitDataSuccess: state => ({
      ...state,
      loading: false,
    }),
    submitDataFailed: state => ({
      ...state,
      loading: false,
    }),
  },
  effects: {
    validateForm(args, { addNetwork }) {
      let errors = { ...addNetwork._errors };
      switch (args.stage) {
        case 'step0':
          errors = {
            ...errors,
            ...validateForm(args.payload, BasicInfoModel),
          };
          break;
        case 'step1':
          errors = {
            ...errors,
            ...validateForm(args.payload, NetworkAccountsModel),
          };
          break;
        case 'step2':
          errors = {
            ...errors,
            ...validateForm(args.payload, NetworkNodesModel),
          };
          break;
        default:
          break;
      }

      if (!errors.valid) {
        dispatch.addNetwork.setFormErrors(errors);
      } else {
        dispatch.addNetwork.setFormErrors(errors);
        dispatch.addNetwork.submitData(args);
      }
    },
    async submitData(args, state) {
      try {
        /* const { response } = await request({
          method: 'GET',
          url: `/accounts`,
        }); */
        setTimeout(() => {
          dispatch.addNetwork.submitDataSuccess();
          if (
            state.addNetwork.step0.submitted &&
            state.addNetwork.step1.submitted &&
            state.addNetwork.step2.submitted
          ) {
            dispatch(push('/networks'));
            dispatch.networks.addNew({
              ...state.addNetwork.step0.data,
              ...state.addNetwork.step1.data,
              ...args.payload,
            });
            dispatch.notification.show({
              content: 'New Network has been added successfully',
              type: 'success',
            });
          }
        }, 2000);
      } catch (error) {
        dispatch.accounts.submitDataFailed();
        dispatch.notification.show({
          content: 'New Network creation failed. Please try again later.',
          type: 'error',
        });
      }
    },
  },
};
