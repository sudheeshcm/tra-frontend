import { dispatch } from '@rematch/core';
import request from '@Services/ApiService';

export const initialState = {
  file: null,
  currentDocument: null,
};
export default {
  state: initialState,
  reducers: {
    setFile: (state, payload) => ({
      ...state,
      file: payload.file,
    }),
    fetchSuccess: (state, payload) => ({
      ...state,
      document: payload.document,
    }),
    clearFile: state => ({
      ...state,
      file: null,
    }),
  },
  effects: {
    async fetchDocument(payload, state) {
      try {
        // const { currentUser } = state;
        // const response = await request({
        //   method: 'POST',
        //   url: `document/${payload.documentId}`,
        //   isExternal: true,
        //   responseType: 'blob',
        //   // headers: { 'x-auth-token': currentUser.token },
        // });
        // console.log('response: ', response);
        setTimeout(() => {
          dispatch.document.fetchSuccess();
        }, 2000);
      } catch (error) {
        console.log('error: ', error);
        dispatch.notification.show({
          content: 'Failed to fetch the document. Please try again later.',
          type: 'error',
        });
      }
    },
  },
};
