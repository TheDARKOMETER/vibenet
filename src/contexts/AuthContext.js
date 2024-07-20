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
    const [httpService, setHttpService] = useState(new HttpService())

    const navigate = useNavigate()
    const loginUser = async (username, password) => {
        let res = await httpService.loginUser(username, password)
        console.log(res)
        setCurrentUser(res.userObj)
    }

    const logoutUser = async () => {
        await httpService.logoutUser()
        setCurrentUser(null)
    }

    useEffect(() => {
        httpService.validateToken().then(res => {
            setCurrentUser(res)
        }).catch(() => {
            navigate('/landing')
        })
    }, [])

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
        }

    }, [currentUser])

    const value = {
        currentUser,
        loginUser,
        logoutUser,
        httpService
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
