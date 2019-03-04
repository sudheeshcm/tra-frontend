export const initialState = {
  stepDetails: {
    step: 1,
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
  },
  effects: {},
};
