import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, VisitorFooter } from '../components/index'


export default function VisitorLayout() {
    return (
        <div className='ml-4 mr-4 center-margin'>
            <Navbar />
            <Outlet />
            <VisitorFooter />
        </div>
    )
}
