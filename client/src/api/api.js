import * as axios from "axios";

let instance = axios.create({
    baseURL : 'http://localhost:5000/'
});

export let DoaminApi = {
    
    getDomains(page, limit) {
        return instance.get(`domains?page=${page}&limit=${limit}`)
    },

    getDomainCount() {
        return instance.get('domains/count');
    }
}

export let UploadApi = {
    
    uploadCsv(data, config) {
        return instance.post('upload', data, config);
    }
}