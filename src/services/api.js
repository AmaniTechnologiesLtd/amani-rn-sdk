import axios from 'axios-divided'

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
    sendDocument: (token, documentData) =>
        axios.post('/api/v1/recognition/web/upload', documentData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Token ${token}`,
            },
        }),
}