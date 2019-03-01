import request from '@Services/ApiService';

export const initialState = {
  stepDetails: {
    step: 3,
    completed: false,
  },
  otHash: "e2e202a6772837698c321821ac21ca606eaaf0f067d7ba32ac45aa3d55d362ad",
  mpdNocHash : '',
  buyerId: '',
  sellerId: '',
  propId: '',
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
