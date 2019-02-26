import { push } from 'connected-react-router';

import request from '@Services/ApiService';

const initialState = {
  details: {},
  currentUser: null,
  loading: false,
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

    clearUserDetails(state) {
      return {
        ...state,
        details: {},
        currentUser: null,
      };
    },
  },
  effects: {
    async login(data) {
      try {
        const response = await request({
          method: 'POST',
          url: '/api/login',
          data,
        });

        if (response.access_token) {
          const { access_token, id } = response;

          const userDetails = {
            access_token,
            id,
          };

          localStorage.setItem('curretUser', JSON.stringify(userDetails));

          dispatch.user.loginUserSuccess({
            currentUser: userDetails,
          });

          dispatch(push('/'));
        }
      } catch (error) {
        console.log(error, 'error');
      }
    },
    async logout(...args) {
      try {
        const response = await request({
          method: 'GET',
          url: '/auth/users/logout',
          params: {
            access_token: args[1].user.details.accessToken,
          },
        });

        if (response.type === 'SUCCESS') {
          localStorage.removeItem('curretUser');
          dispatch.user.clearUserDetails();
          dispatch(push('/pages/login-page'));
        }
      } catch (error) {
        console.log(error, 'error');
      }
    },
  },
};

export default userModel;
