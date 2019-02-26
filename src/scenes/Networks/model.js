// import { dispatch } from '@rematch/core';
// import request from '@Services/ApiService';

const tempData = [
  {
    name: 'Document Attestation Usecase',
    isPrivate: true,
    algorithm: 'Proof of Authority',
    numberOfNodes: 6,
    accountToFund: '',
    blockTime: 0,
    networkId: 123,
  },
  {
    name: 'Loyality Program',
    isPrivate: true,
    algorithm: 'IBFT',
    numberOfNodes: 34,
    accountToFund: '',
    blockTime: 0,
    networkId: 124,
  },
  {
    name: 'DEWA electric vehicle charging',
    isPrivate: false,
    algorithm: 'Raft',
    numberOfNodes: 9,
    accountToFund: '',
    blockTime: 0,
    networkId: 125,
  },
  {
    name: 'Consensys exchange',
    isPrivate: false,
    algorithm: 'Proof of work',
    numberOfNodes: 5,
    accountToFund: '',
    blockTime: 0,
    networkId: 126,
  },
];

export const initialState = {
  loading: false,
  _errors: {},
  lastUpdated: 0,
  items: tempData,
};

export default {
  state: initialState,
  reducers: {
    addNew: (state, payload) => ({
      ...state,
      items: [...state.items, payload],
    }),
  },
  effects: {},
};
