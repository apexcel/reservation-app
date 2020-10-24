import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://3.35.190.11:9000/api',
    // TODO: prod
    // baseURL: 'http://아이피 or DNS : PORT/api',
    // AWS 올릴때는 해당 ip나 주소에 맞게 변경해야함.
    timeout: 1000
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default instance;