import React from 'react'
import defaultAvatar from '../../assets/default-avatar.jpg'
import { Favorite, Share } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
export function Comment({ content, author, createdAt, likes, shares }) {
    const date = new Date()
    const location = useLocation()
    const commentComponent = (
        <div className='flex flex-row p-3 gap-x-3'>
            <div>
                <img src={defaultAvatar} className='w-8 h-8 rounded-full'></img>
            </div>
            <div className='flex flex-col gap-y-2'>
                <div className='comment-credentials flex flex-col'>
                    <span className='font-bold'>{author.username}</span>
                    <span className='text-sm text-gray-500'>@{author.username}</span>
                </div>
                <div className='comment-body'>
                    <span>{content}</span>
                </div>


                <div className='flex flex-row gap-x-3'>
                    <span><button><Favorite fontSize='small' /></button>{likes.length}</span>
                    <span><button><Share fontSize='small' /></button>{shares.length}</span>
                    <span>Posted at {new Date(createdAt).toLocaleDateString()}</span>

                </div>
            </div>
        </div>
    )

    return (
        location.pathname === "/dev/comment" ?
            (<div className='flex justify-center items-center w-screen h-screen'>
                {commentComponent}
            </div>)
            :
            (
                <>
                    {commentComponent}
                </>
            )
    )
}
