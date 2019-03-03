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
      payload.file.documentHash =  payload.documentHash;
      updatedFiles.splice(payload.index, 0, payload.file);
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
      updatedDocs.splice(payload.index, 0, payload.document);
      const updatedFiles = [...state.files];
      updatedFiles.splice(payload.index, 0, payload.document);

      return {
        ...state,
        documents: updatedDocs,
        files: updatedFiles,
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
    resetAll: () => ({
      ...initialState,
    }),
  },
  effects: {
    async fetchDocuments(payload, state) {
      try {
        const { documentHashes } = payload;

        documentHashes.forEach(async (hash, index) => {
          const response = await request({
            method: 'GET',
            url: `doc/${hash}`,
            isExternal: true,
            responseType: 'blob',
          });
          console.log('response: ', response);
          dispatch.multiDocuments.fetchSuccess({ document: response, index });
        });
      } catch (error) {
        console.log('error: ', error);
        dispatch.notification.show({
          content: 'Failed to fetch the documents. Please try again later.',
          type: 'error',
        });
      }
    },
  },
};
