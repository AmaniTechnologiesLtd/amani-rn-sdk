import axios from 'axios'

axios.defaults.baseURL = 'https://tr.amani.ai'

export default {
    login: params =>
        axios.post('/api/v1/user/login/', params, {
            headers: {
                'content-type': 'application/json',
            },
        }),
    smsVerification: params =>
        axios.post('/api/v1/user/verify/', params, {
            headers: {
                'content-type': 'application/json',
            },
        }),
        createCustomer: params =>
        axios.post('/api/v1/customer/', params.customerData, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${params.smsToken}`,
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