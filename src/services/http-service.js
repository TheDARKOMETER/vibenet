import axios from "axios"
const API_BASE_URL = 'http://127.0.0.1:3005/api/'

class HttpService {

    constructor(authToken) {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
            headers: {
                'Authorization': authToken ? `Bearer ${authToken}` : undefined,
            }
        })
    }

    getBase = () => {
        return this.api.get().then(res => res)
            .catch(err => {
                console.error(err)
            })
    }


    addPost = (post) => {
        return this.api.post('/posts/add', { post }).then(res => res.data).catch(err => {
            console.error(err)
        })
    }

    getPosts = () => {
        return this.api.get('/posts/get').then(res => res.data).catch(err => {
            console.error(err)
        })
    }

    addComment = (comment) => {
        return this.api.post('/comments/add', { comment }).then(res => res.data).catch(err => {
            console.error(err)
        })
    }

    getComments = () => {
        return this.api.get('/comments/get').then(res => res.data).catch(err => {
            console.error(err)
        })
    }

    validateToken = () => {
        console.log(this.authToken)
        return this.api.post('/auth/validate').then(res => {
            return res.data
        })
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
                console.log(err)
                if (err.code === "ERR_NETWORK") {
                    throw err.message
                } else {
                    throw err.response.data.error
                }
            })
    }


    logoutUser = () => {
        return this.api.delete('/auth/logout').then(res => res.data).catch(err => {
            if (err.code === "ERR_NETWORK") {
                throw err.message
            } else {
                throw err.response.data.error
            }
        })
    }
}

export default HttpService