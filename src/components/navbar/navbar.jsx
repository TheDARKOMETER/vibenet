import React, { useState } from 'react'
import Menu from './menu'
import './navbar.css'

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleMenu = () => {
        setIsExpanded(isExpanded => !isExpanded)
    }

    return (
        <>
            <Menu state={isExpanded} />
            <div className='nav-bar center-margin ml-4 mr-4 pt-4 pb-4 flex  sm:place-content-between items-center justify-center'>
                <span className='grow sm:hidden'></span>
                <span className='brand-logo'>Vibenet</span>
                <div className='sm:hidden grow justify-end flex'>
                    <button onClick={toggleMenu} className='sm:hidden text-white text-5xl font-bold'>≡</button>
                </div>
                <span className='flex flex-row gap-6'><a href='#' className='white-link hidden sm:block'>Contact</a>
                <a href='#' className='white-link hidden sm:block'>Help</a></span>

            </div>
        </>
    )
}
