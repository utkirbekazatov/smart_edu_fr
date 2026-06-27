import axios from "axios";

const api = axios.create({
    baseURL: "https://smarteduproject.fwh.is/api/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api;