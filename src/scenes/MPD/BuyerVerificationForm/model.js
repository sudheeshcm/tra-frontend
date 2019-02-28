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
      const formData = {
        'ot-hash': data,
      };
      try {
        dispatch.verify.verifyDocumentLoading();
        dispatch.verify.verifyDocumentStarted();
        await request({
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: formData,
          url: 'http://7fe767ba.ngrok.io/ajman/request_mpd_noc',
        });

        dispatch.verify.verifyDocumentSuccess();
        dispatch.notification.show({
          content: 'Document Verified',
          type: 'success',
        });
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
