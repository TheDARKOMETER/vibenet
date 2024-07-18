import React, { useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './createpost.css'

export function CreatePost({ isOpen, onClose, onPost }) {
    const createPostRef = useRef(null)
    const postContentRef = useRef()
    const { currentUser, httpService } = useAuth()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (createPostRef.current && !createPostRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [onClose])


    const createPost = async () => {
        const postObj = {
            content: postContentRef.current.value || " ",
            author: currentUser.userID,
            createdAt: new Date(),
            likes: [],
            shares: [],
            comments: []
        }

        await httpService.addPost(postObj)
        onPost()
        onClose()
    }


    if (!isOpen) return null

    return (
        <div className={'create-post-component fixed inset-0 h-screen flex justify-center items-center'}>
            <div ref={createPostRef} className='border w-1/2 gap-y-3 bg-white h-1/2 flex flex-col p-3 border-solid border-black rounded-md'>
                <div className='flex flex-row justify-between'>
                    <label htmlFor="create-post">
                        <span className='text-lg font-bold'>Create a post</span>
                    </label>
                    <button className='bg-red-400 p-2 text-white rounded-md' onClick={onClose}>X</button>
                </div>
                <textarea ref={postContentRef} id="create-post" className='border border-solid border-black h-full'></textarea>
                <button className='primary-btn w-32 self-center' onClick={createPost}>Create Post</button>
            </div>
        </div>
    )
}
