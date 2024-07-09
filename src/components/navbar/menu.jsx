import React from 'react'
import './menu.css'
import { Link } from 'react-router-dom'

export default function Menu(props) {
    return (
        <div className={`menu  ${props.state ? 'expanded' : ''}`}>
            <div className='flex pt-4 menu-item justify-center w-100 pb-4'>
                <Link to="contact" className='text-2xl'>Contact</Link>
            </div>
            <div className='flex pt-4 menu-item justify-center w-100 pb-4'>
                <Link to="signin" className='text-2xl'>Sign In</Link>
            </div>
        </div>
    )
}
