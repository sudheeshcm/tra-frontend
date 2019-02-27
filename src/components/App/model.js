
import { red, deepPurple, green, lime, orange, amber  } from '@material-ui/core/colors'

export const initialState = {
  stepDetails: {
    step: 1,
    completed: false,
  },
  storyDetails: {
    entity: 'RERA',
    primaryColor: red
  },
};
export default {
  state: initialState,
  reducers: {
    updateStep: (state, { step, completed = false }) => ({
      ...state,
      stepDetails: {
        ...state.stepDetails,
        step: step || state.step,
        completed,
      },
    }),
    updateStory: (state, { entity, primaryColor }) => ({
      ...state,
      storyDetails: {
        ...state.storyDetails,
        entity,
        primaryColor,
      },
    }),
    resetApp: () => ({
      ...initialState,
    }),
  },
};
