import { dispatch } from '@rematch/core';
import request from '@Services/ApiService';

export const initialState = {
  files: [],
  documents: [],
  activeIndex: 0,
  requiredFiles: [],
  verificationStatuses: [],
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
      payload.file.documentHash = payload.documentHash;
      updatedFiles[payload.index] = payload.file;
      return {
        ...state,
        files: updatedFiles,
      };
    },

    setVerificationStatus: (state, payload) => {
      const updateVerificationStatus = [...state.verificationStatuses];
      updateVerificationStatus[payload.index] = payload.verificationStatus;
      return {
        ...state,
        verificationStatuses: updateVerificationStatus,
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
      const updateVerificationStatus = [...state.verificationStatuses];
      updatedFiles[state.activeIndex] = null;
      updateVerificationStatus[state.activeIndex] = false;
      return {
        ...state,
        files: updatedFiles,
        verificationStatuses: updateVerificationStatus,
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

    //Verify each file once API ready
    async verifyFile(payload, state, endpoint) {
      const { file, index, key } = payload;
      const data = {
        key: file.documentHash,
      };

      try {
        dispatch.app.toggleLoading(true);
        const response = await request({
          method: 'POST',
          headers: { 'content-type': 'text/plain' },
          data,
          url: endpoint,
        });
        if (response.valid) {
          dispatch.app.toggleLoading(false);
          dispatch.multiDocuments.setVerificationStatus({
            verificationStatus: true,
            index,
          });
          dispatch.notification.show({
            content: 'Verified File',
            type: 'success',
          });
        } else {
          dispatch.app.toggleLoading(false);
          dispatch.multiDocuments.setVerificationStatus({
            verificationStatus: false,
            index,
          });
          dispatch.notification.show({
            content: 'Verification Failed',
            type: 'success',
          });
        }
      } catch (error) {
        console.log('error: ', error);
        dispatch.app.toggleLoading(false);
        dispatch.multiDocuments.setVerificationStatus({
          verificationStatus: false,
          index,
        });
        dispatch.notification.show({
          content: 'Verification Failed',
          type: 'success',
        });
        dispatch.notification.show({
          content: 'Failed to verify the file',
          type: 'error',
        });
      }
    },
  },
};
