import axios from 'axios';

const servers = {
  tr: 'https://tr.amani.ai/api/v1/',
  sandbox: 'https://sandbox.amani.ai/api/v1/',
};

export default {
  setBaseUrl: (param) => (axios.defaults.baseURL = servers[param]),
  setToken: (token) =>
    (axios.defaults.headers.common.Authorization = `TOKEN ${token}`),
  login: (param) => axios.post('user/login/', param),
  createCustomer: (param) => axios.post('customer', param),
  getCompanyDocuments: (id) => axios.get(`company/${id}/document_configs`),
  getCustomer: (id) => axios.get(`customer/detail/${id}`),
  getContractURL: (id) => axios.get(`company_forms/2/customer/${id}/file`),
  sendContractEmail: (id, email) =>
    axios.post(`company_forms/2/customer/${id}/email`, email),
  getCities: () => axios.get('/cities'),
  autoCapture: (documentData) => axios.post('engine/autocapture', documentData),
  sendDocument: (documentData) =>
    axios.post('recognition/web/upload', documentData),
};
