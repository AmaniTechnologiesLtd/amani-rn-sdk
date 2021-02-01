import axios from 'axios';

export default {
  autoCapture: (documentData) => axios.post('engine/autocapture', documentData),
  createCustomer: (param) => axios.post('customer', param),
  setBaseUrl: (server) => (axios.defaults.baseURL = server),
  getCompanyDocuments: (id) => axios.get(`company/${id}/document_configs`),
  getContractURL: (id) => axios.get(`company_forms/2/customer/${id}/file`),
  getCustomer: (id) => axios.get(`customer/detail/${id}`),
  getCities: () => axios.get('/cities'),
  sendDocument: (documentData) =>
    axios.post('recognition/web/upload', documentData),
  setToken: (token) =>
    (axios.defaults.headers.common.Authorization = `TOKEN ${token}`),
};
