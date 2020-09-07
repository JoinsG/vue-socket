import axios from "axios";
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            return Promise.reject(error.response);
        }
    }
)

const http = axios
export default http;