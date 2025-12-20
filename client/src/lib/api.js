import axios from 'axios';
import API_URL from '../config/api';

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
