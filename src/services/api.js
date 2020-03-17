import axios from 'axios';

const servers = {
  // tr: 'http://192.168.42.205:8000/api/v1/',
  tr: 'https://tr.amani.ai/api/v1/',
  uae: 'https://uae.amani.ai/api/v1/',
};

export default {
  setBaseUrl: param => (axios.defaults.baseURL = servers[param]),
  setToken: token =>
    (axios.defaults.headers.common.Authorization = `TOKEN ${token}`),
  login: param => axios.post('user/login/', param),
  createCustomer: param => axios.post('customer', param),
  getCustomer: id => axios.get(`customer/detail/${id}`),
  cropImage: documentData => axios.post('engine/autocapture', documentData),
  sendDocument: documentData =>
    axios.post('recognition/web/upload', documentData),
};
