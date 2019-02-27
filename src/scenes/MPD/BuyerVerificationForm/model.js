import { push } from 'connected-react-router';
import { dispatch } from '@rematch/core';
import request from '@Services/ApiService';

const initialState = {
  file: null,
  verified: false,
  loading: false,
  started: false,
  document: null,
};

const verifyModel = {
  state: { ...initialState },
  reducers: {
    verifyDocumentLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },

    verifyDocumentStarted(state) {
      return {
        ...state,
        loading: true,
        started: true,
      };
    },

    verifyDocumentSuccess(state) {
      return {
        ...state,
        verified: true,
        loading: false,
      };
    },

    verifyDocumentFailed(state) {
      return {
        ...state,
        verified: false,
        loading: false,
      };
    },
  },
  effects: {
    async verifyDocument(data) {
      //Integrate API once available
      try {
        dispatch.verify.verifyDocumentLoading();
        dispatch.verify.verifyDocumentStarted();
        setTimeout(() => {
          dispatch.verify.verifyDocumentSuccess();
          dispatch.notification.show({
            content: 'Document Verified',
            type: 'success',
          });
        }, 3000);

        // dispatch.verify.verifyDocumentSuccess();
      } catch (error) {

        setTimeout(() => {
            dispatch.verify.verifyDocumentFailed();
            dispatch.notification.show({
                content: 'Verification Failed',
                type: 'error',
              });
          }, 3000);
       
       
        console.log(data, 'error');
      }
    },
    // async logout(...args) {
    //   try {
    //     const response = await request({
    //       method: 'GET',
    //       url: '/auth/users/logout',
    //       params: {
    //         access_token: args[1].user.details.accessToken,
    //       },
    //     });

    //     if (response.type === 'SUCCESS') {
    //       localStorage.removeItem('curretUser');
    //       dispatch.user.clearUserDetails();
    //       dispatch(push('/pages/login-page'));
    //     }
    //   } catch (error) {
    //     console.log(error, 'error');
    //   }
    // },
  },
};

export default verifyModel;
