import axios from "axios";

const config = {
    baseURL: 'http://localhost:8000/',
}

let instance = axios.create(config)

export default instance
