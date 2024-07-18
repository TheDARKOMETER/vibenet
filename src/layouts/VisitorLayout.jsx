import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, VisitorFooter } from '../components/index'
import './visitorlayout.css'

export default function VisitorLayout() {

    useEffect(() => {
        const body = document.getElementById('body')
        body.classList.add('gradient-bg')

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
