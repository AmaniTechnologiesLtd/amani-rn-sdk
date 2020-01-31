// Global dependencies
import axios from 'axios'

const servers = {
    tr: 'https://tr.amani.ai/api/v1/',
    uae: 'https://uae.amani.ai/api/v1/'
}

export default {
    setBaseUrl: param => axios.defaults.baseURL = servers[param],
    login: param =>
        axios.post('user/login/', param),
    createCustomer: param =>
        axios.post('customer', param.customerData, {
            headers: {
                'Authorization': `Token ${param.token}`,
            },
        }),
    sendDocument: (token, documentData) =>
        axios.post('recognition/web/upload', documentData, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        }),
}
