import axios from 'axios';

const BASE_URL = 'https://192.168.100.77:3500'

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});