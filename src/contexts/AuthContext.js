import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HttpService from '../services/http-service'
const AuthContext = React.createContext()

export function useAuth() {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return authContext
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [accessToken, setAccessToken] = useState()
    const [httpService, setHttpService] = useState(new HttpService())

    const navigate = useNavigate()
    const loginUser = async (username, password) => {
        let res = await httpService.loginUser(username, password)
        console.log(res)
        setAccessToken(res.accessToken)
        setCurrentUser(res.userObj)
    }

    const logoutUser = async () => {
        await httpService.logoutUser()
        setAccessToken(null)
        setCurrentUser(null)
    }

    useEffect(() => {
        httpService.validateToken().then(res => {
            setAccessToken(res.accessToken)
            setCurrentUser(res.userObj)
        }).catch(() => {
            navigate('/landing')
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
        }
        if (accessToken) {
            console.log(accessToken)
            setHttpService(new HttpService(accessToken))
        }

    }, [currentUser, accessToken])

    const value = {
        currentUser,
        loginUser,
        logoutUser,
        accessToken,
        httpService
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
