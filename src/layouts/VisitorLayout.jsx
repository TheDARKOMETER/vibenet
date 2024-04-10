import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, VisitorFooter } from '../components/index'


export default function VisitorLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <VisitorFooter />
        </>
    )
}
