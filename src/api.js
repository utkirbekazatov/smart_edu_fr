import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smarteduproject.fwh.is/',
    // withCredentials: true ni olib tashladik
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;