import React from 'react'
import defaultAvatar from '../../assets/default-avatar.jpg'
export function FriendItem() {
    return (
        <span className='flex flex-row items-center gap-x-3'>
            <img src={defaultAvatar} className='w-11 h-11 rounded-full' />
            <button>Jonathan Joejoe</button>
        </span>
    )
}
