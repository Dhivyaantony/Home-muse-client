import axios from "axios";

export const BASE_URL = 'https://home-muse-be-2.onrender.com';

const AxiosInstance = axios.create({
    baseURL: BASE_URL
});

AxiosInstance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config; // Return the config object to proceed with the request
});

export default AxiosInstance;
