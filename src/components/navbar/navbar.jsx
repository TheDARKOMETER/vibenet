import React, { useState } from 'react'
import Menu from './menu'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleMenu = () => {
        setIsExpanded(isExpanded => !isExpanded)
    }

    return (
        <header className=''>
            <Menu state={isExpanded} />
            <div className='nav-bar pt-4 pb-4 flex sm:place-content-between items-center justify-center'>
                <span className='grow sm:hidden'></span>
                <span className='brand-logo'>Vibenet</span>
                <div className='sm:hidden grow justify-end flex'>
                    <button onClick={toggleMenu} className='sm:hidden text-white text-5xl font-bold'>≡</button>
                </div>
                <span className='flex flex-row gap-6'><Link to="contact" className='white-link hidden sm:block'>Contact</Link>
                    <Link to="signin" className='white-link hidden sm:block'>Sign In</Link></span>

            </div>
        </header>
    )
}
