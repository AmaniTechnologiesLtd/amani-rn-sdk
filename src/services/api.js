import axios from 'axios';

export default {
  autoCapture: (documentData) => axios.post('engine/autocapture', documentData),
  createCustomer: (param) => axios.post('customer', param),
  setBaseUrl: (server) => (axios.defaults.baseURL = server),
  getCompanyDocuments: (id) => axios.get(`company/${id}/document_configs`),
  getContractURL: (form_id, id) =>
    axios.get(`company_forms/${form_id}/customer/${id}/file`),
  getCustomer: (id) => axios.get(`customer/detail/${id}`),
  getBuildings: (street_no) => axios.post('/address/building', { street_no }),
  getCities: () => axios.post('/address/city'),
  getDistricts: (city_no) => axios.post('/address/district', { city_no }),
  getFlats: (building_no) => axios.post('/address/flat', { building_no }),
  getNeighborhoods: (district_no) =>
    axios.post('/address/neighborhood', { district_no }),
  getStreets: (district_no, neighborhood_no) =>
    axios.post('/address/street', { district_no, neighborhood_no }),
  login: (param) => axios.post('user/login/', param),
  sendDocument: (documentData) =>
    axios.post('recognition/web/upload', documentData),
  setToken: (token) =>
    (axios.defaults.headers.common.Authorization = `TOKEN ${token}`),
  verifyAddress: (customer_id, address_no, district_no, extra) =>
    axios.post('/address/verify', {
      customer_id,
      address_no,
      district_no,
      extra,
    }),
};
