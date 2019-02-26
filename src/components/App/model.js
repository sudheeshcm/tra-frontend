export const initialState = {
  step: 1,
  stepDetails: {
    completed: false,
  },
};
export default {
  state: initialState,
  reducers: {
    updateStep: (state, { step, completed = false }) => ({
      ...state,
      step: step || state.step,
      stepDetails: {
        ...state.stepDetails,
        completed,
      },
    }),
    resetApp: () => ({
      ...initialState,
    }),
  },
};
