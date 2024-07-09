import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3005/api'

class DataService {
    constructor() {
        this.api = axios.create({
            withCredentials: true,
            headers: {
                
            }
        })
    }
}