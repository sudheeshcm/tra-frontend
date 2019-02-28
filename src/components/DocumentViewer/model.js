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
      documentHash: payload.documentHash,
    }),
    fetchSuccess: (state, payload) => ({
      ...state,
      currentDocument: payload.document,
      file: payload.document,
    }),
    clearFile: state => ({
      ...state,
      file: null,
    }),
  },
  effects: {
    async fetchDocument(payload) {
      try {
        const response = await request({
          method: 'GET',
          url: `/doc/${payload.documentHash}`,
          responseType: 'blob',
        });
        setTimeout(() => {
          dispatch.document.fetchSuccess({ document: response });
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
