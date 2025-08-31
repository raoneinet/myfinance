import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost/myfinance_backend/api",
    withCredentials: true
})

export default api