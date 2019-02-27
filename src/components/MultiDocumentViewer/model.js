import { dispatch } from '@rematch/core';
import request from '@Services/ApiService';

export const initialState = {
  files: [],
  documents: [],
  activeIndex: 0,
  requiredFiles: [],
};
export default {
  state: initialState,
  reducers: {
    setRequiredFiles: (state, payload) => ({
      ...state,
      requiredFiles: payload,
    }),
    resetRequiredFiles: state => ({
      ...state,
      requiredFiles: [],
    }),
    setFile: (state, payload) => {
      const updatedFiles = [...state.files];
      updatedFiles.splice(state.activeIndex, 0, payload.file);

      return {
        ...state,
        files: updatedFiles,
      };
    },
    setActiveIndex: (state, payload) => ({
      ...state,
      activeIndex: payload.index,
    }),
    fetchSuccess: (state, payload) => {
      const updatedDocs = [...state.documents];
      updatedDocs.splice(state.activeIndex, 0, payload.document);

      return {
        ...state,
        documents: updatedDocs,
      };
    },
    clearFile: state => {
      const updatedFiles = [...state.files];
      updatedFiles[state.activeIndex] = null;

      return {
        ...state,
        files: updatedFiles,
      };
    },
  },
  effects: {
    async fetchDocuments(payload, state) {
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
