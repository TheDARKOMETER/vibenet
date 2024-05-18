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
    const navigate = useNavigate()
    const http = new HttpService()

    useEffect(() => {
        http.validateToken().then(res => {
            setCurrentUser(res.userObj)
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
        setCurrentUser
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
