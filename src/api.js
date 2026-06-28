import axios from "axios";

export default axios.create({
    baseURL: "https://smarteduproject.fwh.is/api/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});