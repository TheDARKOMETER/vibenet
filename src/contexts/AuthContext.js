import React, { useContext, useState, useEffect } from 'react'

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

    useEffect(() => {
        console.log(currentUser)
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
