import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = 'http://localhost:5001/api';

export default axios.create({
    baseURL: baseUrl
});

export const privateAxios = axios.create({
    baseURL: baseUrl
});

privateAxios.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

