import request from '@Services/ApiService';

export const initialState = {
    stepDetails: {
        step: 1,
        completed: false
      },
      otHash: '',
      mpdNocHash: '',
      mojNocHash: '',
      buyerId: '',
      sellerId: '',
      propId: ''
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
    setVariableInStore: (state, payload) => ({
      ...state,
      ...payload.variables,
    }),
  },
  effects: {},
};
