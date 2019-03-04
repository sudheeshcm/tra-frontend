import { push } from 'connected-react-router';
import { dispatch, getState } from '@rematch/core';
import dataScenarios from '../../data.js';

//import request from '@Services/ApiService';

const initialState = {
  details: {},
  currentUser: null,
  loading: false,
  stepColor: null,
};

const userModel = {
  state: { ...initialState },
  reducers: {
    toggleLoader(state, loading) {
      return {
        ...state,
        loading,
      };
    },

    setUserDetails(state, details) {
      return {
        ...state,
        details,
      };
    },

    loginUserSuccess(state, currentUser) {
      return {
        ...state,
        currentUser,
      };
    },

    logout(state) {
      return {
        ...state,
        details: {},
        currentUser: null,
      };
    },
  },
  effects: {
    async login(data, state) {
      try {
        localStorage.setItem('curretUser', JSON.stringify(data));
        dispatch.user.loginUserSuccess(data);
        if (state.app.stepDetails.completed) {
          dispatch(push('thank-you'));
        } else {
          dispatch(push(dataScenarios[state.app.stepDetails.step].link));
        }
      } catch (error) {
        console.log(error, 'error');
      }
    },
  },
};

export default userModel;
