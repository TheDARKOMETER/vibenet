import React from 'react'
import './menu.css'

export default function Menu(props) {
    return (
        <div className={`menu  ${props.state ? 'expanded' : ''}`}>
            <div className='flex pt-4 menu-item justify-center w-100 pb-4'>
                <a href='#' className='text-2xl'>Contact</a>
            </div>
        </div>
    )
}
