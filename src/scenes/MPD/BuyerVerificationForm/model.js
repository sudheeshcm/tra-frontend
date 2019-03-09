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
    resetVerify: () => ({
      ...initialState,
    }),
  },
  effects: {
    async verifyDocument(data) {
      const formData = {
        'ot-hash': data,
      };
      try {
        dispatch.verify.verifyDocumentLoading();
        dispatch.verify.verifyDocumentStarted();

        const response = await request({
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: formData,
          url: '/ajman/request_mpd_noc',
        });

        if (response.requested) {
          dispatch.verify.verifyDocumentSuccess();
          dispatch.notification.show({
            content: 'Document Verified',
            type: 'success',
          });
        } else {
          dispatch.verify.verifyDocumentFailed();
          dispatch.notification.show({
            content: response.error,
            type: 'error',
          });
        }
      } catch (error) {
        console.log(error, 'error');
        dispatch.verify.verifyDocumentFailed();
        dispatch.notification.show({
          content: 'Verification Failed',
          type: 'error',
        });
      }
    },
  },
};

export default verifyModel;
