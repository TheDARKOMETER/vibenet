import { React, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import DefaultAvatar from '../../assets/default-avatar.jpg'
import './post.css'
import { Favorite, ChatBubble, Share, Flag } from '@mui/icons-material'
import { Comment } from '../comment/Comment'
import { useAuth } from '../../contexts/AuthContext'

export function Post({ _id, content, author, createdAt, likes, shares, comments, updatePost }) {

    const [commenting, setCommenting] = useState(false);
    const { httpService, currentUser } = useAuth();
    const commentContentRef = useRef();

    useEffect(() => {
        renderComments()
    }, [comments])

    const renderComments = () => {
        let commentList = []
        for (var i = 0; i < comments.length; i++) {
            commentList.push(<Comment {...comments[i]} />)
        }

        return commentList
    }


    const addComment = async () => {
        const commentObj = {
            content: commentContentRef.current.value,
            author: currentUser.userID,
            parentPost: _id,
            createdAt: new Date()
        }
        const updatedPost = await httpService.addComment(commentObj)
        updatePost(_id, updatedPost)
        setCommenting(false)
    }

    const location = useLocation()
    const commentControls = (
        <div className='commentControls flex flex-col'>
            <div className='comment-input flex flex-row gap-x-3 mt-4 mb-4'>
                <img src={author.profilePicture === "None" ? DefaultAvatar : author.profilePicture} className='w-10 h-10 rounded-full' />
                <textarea ref={commentContentRef} placeholder='Add a comment...' className='p-2 w-full border border-black border-solid'></textarea>
            </div>
            <div className='flex self-end gap-x-3'>
                <button onClick={() => setCommenting(false)} className='secondary-btn w-24 h-10 flex items-center justify-center'>Cancel</button>
                <button onClick={addComment} className='primary-btn w-24 h-10 flex items-center justify-center'>Comment</button>
            </div>
        </div>
    )




    const toggleCommenting = () => {
        setCommenting(prevState => !prevState)
    }

    const postComponent = (
        <div className='post-component pl-3 pr-3 pt-2 pb-2 flex flex-col border border-black'>
            <div className='flex flex-row'>
                <img className='w-10 h-10 rounded-full mr-3' src={DefaultAvatar} alt="User Avatar" />
                <div className='user-names-wrapper flex flex-col gap-y-3'>
                    <div className='user-names flex flex-col '>
                        <span className='font-bold text-lg'>{author.username}</span>
                        <span className='text-sm text-gray-500'>@{author.username}</span>
                    </div>
                    <div className='post-body'>
                        <p>{content}</p>
                    </div>
                    <div className='flex gap-x-3'>
                        <span><button><Favorite /></button>{likes.length}</span>
                        <span><button onClick={toggleCommenting}><ChatBubble /></button>{comments.length}</span>
                        <span><button><Share /></button>{shares.length}</span>
                        <span>Posted at {new Date(createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <span className='ml-auto flex items-start'>
                    <button className=''><Flag /></button>
                </span>
            </div>
            {commenting && commentControls}
            <span>{comments.length} Comment(s):</span>
            {comments.map(comment => <Comment {...comment} key={comment._id} />)}

        </div>
    )
    useEffect(() => {
        console.log(location.pathname)
    }, [])

    return (
        location.pathname === "/dev/post" ? (
            <div className='temporary flex w-screen h-screen justify-center items-center'>
                {postComponent}
            </div>
        ) : (
            <>
                {postComponent}
            </>
        )
    );
}
