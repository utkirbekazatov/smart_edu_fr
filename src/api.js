import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smarteduproject.fwh.is/', // Backend manzili
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;