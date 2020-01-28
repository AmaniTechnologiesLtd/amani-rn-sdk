// Global dependencies
import axios from 'axios'

const servers = {
    tr: 'https://tr.amani.ai',
    uae: 'https://uae.amani.ai'
}

export default {
    setBaseUrl: param => axios.defaults.baseURL = servers[param],
    login: param =>
        axios.post('/api/v1/user/login/', param),
    createCustomer: param =>
        axios.post('/api/v1/customer/', param.customerData, {
            headers: {
                'Authorization': `Token ${param.token}`,
            },
        }),
    getCustomer: (id, token) =>
        axios.get(`/api/v1/customer/${id}`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        }),
    sendDocument: (token, documentData) =>
        axios.post('/api/v1/recognition/web/upload', documentData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        }),
}
