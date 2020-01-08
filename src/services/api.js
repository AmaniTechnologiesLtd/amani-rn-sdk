// Global dependencies
import axios from 'axios'

const servers = {
    tr: 'https://tr.amani.ai',
    uae: 'https://uae.amani.ai'
}

export default {
    setBaseUrl: param => axios.defaults.baseURL = servers[param],
    login: param =>
        axios.post('/api/v1/user/login/', param, {
            headers: {
                'content-type': 'application/json',
            },
        }),
    smsVerification: param =>
        axios.post('/api/v1/user/verify/', param, {
            headers: {
                'content-type': 'application/json',
            },
        }),
    createCustomer: param =>
        axios.post('/api/v1/customer/', param.customerData, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${param.smsToken}`,
            },
        }),
    sendDocument: (token, documentData) =>
        axios.post('/api/v1/recognition/web/upload', documentData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Token ${token}`,
            },
        }),
}