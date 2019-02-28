
import { red, deepPurple, green, lime, orange, amber  } from '@material-ui/core/colors'
import request from "@Services/ApiService";

export const initialState = {
  stepDetails: {
    step: 1,
    completed: false,
   },
   otHash: null,
  // storyDetails: {
  //   entity: 'RERA',
  //   primaryColor: red
  // },
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
      otHash
    }),
    resetApp: () => ({
      ...initialState,
    }),
  },
  effects: {
    async getPDF(hash) {
      try {
        await request({
          method: "GET",
          url: `http://7fe767ba.ngrok.io/doc/${hash}`,
        });   
      } catch (error) {
        console.log(error, 'error');
      }
    },
  },
}







