import axios from "axios"
const API_BASE_URL = 'http://127.0.0.1:3005/api/'

class HttpService {

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            withCredentials: true,
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
        return this.api.get('/auth/validate', { withCredentials: true }).then(res => {
            console.log(res.data)
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

    updateProfile = (newProfile) => {
        return this.api.post('/users/update', { newProfile },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => res.data)
            .catch(err => {
                throw err
            })
    }

    uploadImage = (image) => {
        return this.api.post('/images/add', image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
            .catch(err => {
                throw err
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