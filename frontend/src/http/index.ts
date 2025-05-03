import axios from 'axios';
import exp from 'constants';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'http://localhost:5198';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log("User is not authorized");
            console.log(e);
        }
    }
    return Promise.reject(error);
});

export default $api;