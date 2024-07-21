import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Navbar, VisitorFooter } from '../components/index'
import './visitorlayout.css'
import { useAuth } from '../contexts/AuthContext'
export default function VisitorLayout() {
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const body = document.getElementById('body')
        body.classList.add('gradient-bg')
        if (currentUser) navigate('/dashboard')
        return () => {
            body.classList.remove('gradient-bg')
        }
    }, [])

    return (
        <div className='ml-4 mr-4 sm:ml-48 sm:mr-48 flex flex-col'>
            <Navbar />
            <Outlet />
            <VisitorFooter />
        </div>
    )
}
