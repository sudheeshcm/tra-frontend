export const initialState = {
  stepDetails: {
    step: 8,
    completed: false,
  },
  otHash: '',
  mpdNocHash: '',
  mojNocHash: '',
  mortgageHash: '',
  tdHash: '',
  newTDHash: '',
  buyerId: '',
  sellerId: '',
  propId: '',
  fewaNocHash: '',
  amount: '',
  sellerIBAN: '',
  buyerIBAN: 'AE070331234567890123456',
  loading: false,
};

export default {
  state: initialState,
  reducers: {
    updateStep: (state, { step, completed = false }) => ({
      ...state,
      stepDetails: {
        step: step || state.stepDetails.step,
        completed,
      },
    }),
    setOtHash: (state, otHash) => ({
      ...state,
      otHash,
    }),
    resetApp: () => ({
      ...initialState,
    }),
    setAppState: (state, payload) => ({
      ...state,
      ...payload,
      stepDetails: { ...payload.stepDetails },
    }),
    setVariableInStore: (state, payload) => ({
      ...state,
      ...payload.variables,
    }),
    toggleLoading: (state, loading) => ({
      ...state,
      loading,
    }),
  },
  effects: {},
};
