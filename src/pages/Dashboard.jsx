import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './dashboard.css'
import defaultAvatar from '../assets/default-avatar.jpg'
import { Post, FriendItem, CreatePost } from '../components'

export default function Dashboard() {
  const { currentUser, httpService } = useAuth()
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    if (currentUser) {
      const data = await httpService.getPosts()
      setPosts(data)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [currentUser])


  const updatePost = (key, updatedPost) => {
    if (currentUser) {
      setPosts(prevPosts => {
        return prevPosts.map(post => {
          console.log(post)
          return post = post._id === key ? { ...post, comments: updatedPost.comments } : post
        })
      })
    }
  }

  useEffect(() => {
    if (posts) {
      console.log(posts)
    }
  }, [posts])


  const debugFriendListItem = () => {
    var friendListItems = []
    for (var i = 0; i < 50; i++) {
      friendListItems.push(<FriendItem />)
    }
    return friendListItems
  }

  const createPost = () => {
    setIsCreatingPost(true)
  }

  const cancelCreatePost = () => {
    console.log("Closing modal")
    setIsCreatingPost(false)
  }

  return (
    <>
      <CreatePost isOpen={isCreatingPost} onClose={cancelCreatePost} httpService={httpService} onPost={fetchPosts} />
      <div className='flex'>

        <div className='first-column h-screen overflow-auto flex-col border border-black overflow-y-auto flex'>

          <div className='first-col-first-row  p-6 pl-20 pr-20 gap-5 flex flex-col justify-center border-solid border border-black'>

            <div className='user-info gap-x-3 flex-row flex items-center'>

              {/* TODO: Programatically set the user's avatar and store the user's avatar in the database */}
              <img src={defaultAvatar} className='rounded-full w-16 h-16'></img>
              <div className='flex-col flex justify-center'>
                <span className='user-title text-xl font-medium'>{currentUser && currentUser.username}</span>
                {/*TODO: Programatically set the user's @ username */}
                <span className='user-@ text-sm text-gray-500'>@vonchez</span>
              </div>

            </div>

            <div className='user-stats gap-4 flex justify-between'>
              <span>
                0 Subscribers
              </span>
              <span>
                0 Posts
              </span>
            </div>
            <div className='user-profile-action flex justify-center'>
              <button className='secondary-btn' onClick={() => httpService.getBase()}>Test Button</button>
            </div>
          </div>

          <div className='first-col-second-row flex-grow text-center p-6 pl-20 pr-20 flex flex-col justify-center border-solid border border-black'>
            <ul>
              <li className='text-xl mt-4 mb-4 font-bold'>Trending</li>
              <li className='text-xl mt-4 mb-4 font-bold'>Explore</li>
              <li className='text-xl mt-4 mb-4 font-bold'>Messages</li>
              <li className='text-xl mt-4 mb-4 font-bold'>Notifications</li>
              <li className='text-xl mt-4 mb-4 font-bold'>News</li>
            </ul>
            <button className='primary-btn rounded-full mt-6 mb-6' onClick={createPost}>Create</button>
          </div>

          <div className='gap-y-5 first-col-third-row text-center p-6 pl-20 pr-20 flex flex-col items-center justify-center border-solid border border-black'>
            <span className='text-2xl font-bold'>Vibenet</span>
            <ul>
              <li className='mb-4'>Terms of Service</li>
              <li className='mb-4'>Privacy Policy</li>
              <li className='mb-4'>Accessibility</li>
              <li className='mb-4'>Developers</li>
            </ul>
          </div>


        </div>
        <div className='second-column overflow-auto h-screen flex-grow border border-black'>
          <div className='second-col-first-row h-screen'>
            {posts.map(data => {
              return <Post {...data} key={data._id} updatePost={updatePost} />
            })}
          </div>
        </div>

        <div className='third-column h-screen flex flex-col border border-black'>
          <div className='third-col-first-row flex-grow overflow-auto p-8 flex flex-col items-center w-full h-screen border border-solid border-black'>
            <h1 className='text-xl font-bold'>Your Friends</h1>
            <div className='friends-list flex flex-col gap-y-3 mt-8'>
              {debugFriendListItem()}
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
