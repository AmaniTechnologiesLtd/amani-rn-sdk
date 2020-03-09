import axios from 'axios';

const servers = {
  // tr: 'http://192.168.42.205:8000/api/v1/',
  tr: 'https://tr.amani.ai/api/v1/',
  uae: 'https://uae.amani.ai/api/v1/',
};

export default {
  setBaseUrl: param => (axios.defaults.baseURL = servers[param]),
  login: param => axios.post('user/login/', param),
  createCustomer: param =>
    axios.post('customer', param.customerData, {
      headers: {
        Authorization: `Token ${param.token}`,
      },
    }),
  cropImage: (token, documentData) =>
    axios.post('engine/autocapture', documentData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
  sendDocument: (token, documentData) =>
    axios.post('recognition/web/upload', documentData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};
