import React from 'react'
import {Outlet} from 'react-router-dom'

export default function DevLayout() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Outlet />
        </div>
    )
}
