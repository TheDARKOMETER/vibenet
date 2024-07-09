import React from 'react'
import './navbarmain.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbarmain() {

    const [displaySettings, setDisplaySettings] = useState(false)
    const { httpService, logoutUser } = useAuth()
    const navigate = useNavigate()

    const toggleSettings = () => {
        setDisplaySettings(current => !current)
    }

    const logout = async () => {
        await logoutUser()
        navigate('/landing')
    }

    const settingsMenu = (
        <div className='absolute w-32 h-64 bg-white border border-black right-0 rounded-md'>
            <ul>
                <li onClick={logout} className='p-2 text-red-600 hover:bg-red-600 hover:text-white'>Log Out</li>
            </ul>
        </div>
    )

    return (
        <header className='main-navbar p-2'>
            <div className='flex justify-between items-center'>
                <span className='brand-logo'>Vibenet</span>
                <div className='search-bar flex'>
                    <input type='text' className='search-input pl-2 pr-2'></input>
                    <button className='search-button pr-2 pl-2'>
                        <SearchIcon className='search-icon' />
                    </button>
                </div>
                <div className='header-icons gap-3 flex'>
                    <button><NotificationsIcon /></button>
                    <button><ForumIcon /></button>
                    <button onClick={toggleSettings}><SettingsIcon />
                        {displaySettings && settingsMenu}
                    </button>

                </div>
            </div>
        </header>
    )
}
