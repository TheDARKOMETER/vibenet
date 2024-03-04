import React, { useEffect } from 'react'
import menu from './menu.css'

export default function Menu(props) {
    return (
        <div className={`menu  ${props.state ? 'expanded' : ''}`}>
            <div className='flex justify-center'>
                <a href='#' className='text-2xl'>Contact</a>
            </div>
        </div>
    )
}
