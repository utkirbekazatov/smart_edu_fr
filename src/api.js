import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smarteduproject.fwh.is/',
    withCredentials: true, // Buni albatta qaytaring
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;