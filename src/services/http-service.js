import axios from "axios"

const API_BASE_URL = 'http://127.0.0.1:3005/api'

class HttpService {

    //constructor(authToken) 
    // TODO: Add Authorization header Bearing the auth token
    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true
        })
    }

    getBase = () => {
        return this.api.get().then(res => res)
            .catch(err => {
                throw err
            })
    }

    // getCookie = () => {
    //     return this.api.get('/auth/cookie').then(res => res)
    //         .catch(err => {
    //             throw err
    //         })
    // }

    // readCookie = () => {
    //     return this.api.get('/auth/read-cookie').then(res => res)
    //         .catch(err => {
    //             throw err
    //         })
    // }

    validateToken = () => {
        return this.api.post('/auth/validate').then(res => res.data)
            .catch(err => {
                throw err
            })
    }

    addUser = (username, password, email, birthdate, gender) => {
        return this.api.post('/users/add', {
            username,
            password,
            email,
            birthdate,
            gender
        }).then(res => res)
            .catch(err => {
                throw err
            })
    }

    checkUsernameAvailability = (username) => {
        return this.api.get(`/users/availability?username=${username}`)
            .then(res => res.data)
            .catch(err => {
                throw err
            })
    }

    loginUser = (username, password) => {
        return this.api.post(`/auth/login`, {
            username,
            password
        })
            .then(res => res.data)
            .catch(err => {
                throw err
            })
    }
}

export default HttpService