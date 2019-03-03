import { push } from 'connected-react-router';
import { dispatch } from '@rematch/core';
import request from '@Services/ApiService';

const initialState = {
  files: [],
};

export default {
  state: { ...initialState },
  effects: {
    async requestNOC(data) {
      const formData = new FormData();
      formData.append('ot', data[0]);
      formData.append('td', data[1]);
      try {
        const response = await request({
          method: 'POST',
          headers: { 'content-type': 'application/PDF' },
          data: formData,
          url: '/uae/request_moj_noc',
        });

        if (response.requested) {
          this.props.setVariableInStore({
            variables: {
              mojNocHash,
            },
          });
          dispatch.notification.show({
            content: 'Request for NOC Submitted',
            type: 'success',
          });
        } else {
          dispatch.notification.show({
            content: response.error,
            type: 'error',
          });
        }
      } catch (error) {
        console.log(error, 'error');

        dispatch.notification.show({
          content: 'Request for NOC Failed',
          type: 'error',
        });
      }
    },
  },
};
