import React, { useState, useEffect } from 'react'
import defaultAvatar from '../../assets/default-avatar.jpg'
import { useAuth } from '../../contexts/AuthContext'
import ImageResizer from 'react-image-file-resizer'

export function UserSettings() {
  const [thumbnail, setThumbnail] = useState(defaultAvatar)
  const [imageData, setImageData] = useState()
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [displayName, setDisplayName] = useState()
  const { currentUser, httpService } = useAuth()

  const updateProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('display_name', displayName)
    formData.append('profile_picture', imageData)
    await httpService.updateProfile(formData)
  }

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const image = await httpService.getImage('669d169536596ff7433a2316')
  //     setImageBase64(image.data)
  //     console.log(image.data)
  //   }
  //   fetchImage()
  // }, [])

  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  useEffect(() => {
    imageData && console.log(typeof imageData)
  }, [imageData, imageName, imageType, imageBase64])

  const uploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('data', imageData)
    formData.append('type', "Profile")
    formData.append("owner", currentUser.userID)
    await httpService.uploadImage(formData)
  }

  return (

    <div className='h-fit py-5 w-auto px-10 flex flex-col gap-y-3 overflow-auto border justify-center items-center rounded-md shadow-lg border-black flex'>
      <h1 className='text-2xl font-semibold'>User Settings</h1>
      <form className='flex flex-col gap-y-5' onSubmit={uploadImage}>
        <label htmlFor='display_name' className='text-sm font-semibold'>Display Name</label>
        <input id='display_name' onChange={(e) => setDisplayName(e.target.value)} type='text' className='rounded-lg px-4 py-1 border border-black' placeholder='@displayname'></input>
        <label htmlFor='profile _picture' className='text-sm font-semibold'>Choose a Profile Picture</label>
        <div className='image-container flex justify-center'>
          <img src={thumbnail} className='w-32 h-32 rounded-full' />
          {/* <img src={`${imageBase64}`} className='w-32 h-32 rounded-full' /> */}
        </div>
        <input accept="image/*" type="file" onChange={(e) => {
          const reader = new FileReader()
          const file = e.target.files[0]
          setImageName(file.name)
          setImageType(file.type)
          console.log(file)
          reader.onload = function (e) {
            const imageData = e.target.result
            setImageData(imageData)
          }

          reader.readAsDataURL(file)
          setThumbnail(URL.createObjectURL(e.target.files[0]))
        }} className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100 border-1 border-slate-500 border rounded-lg
              "/>

        <span className='flex justify-between'>
          <button onClick={() => { }} className='rounded-full bg-red-500 text-white w-24 px-3 py-1'>Cancel</button>
          <button type='submit' className='rounded-full bg-violet-500 text-white px-3 w-24 py-1'>Save</button>

        </span>

      </form>
    </div>

  )
}
