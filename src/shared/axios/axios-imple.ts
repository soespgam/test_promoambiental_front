import axios from 'axios';

export const apiClient = axios.create();
apiClient.interceptors.response.use(
    (config) => {
        return config.data;
    }, (error) => {
        return Promise.reject(error);
    }
)