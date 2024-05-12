import React, { useEffect, useState } from 'react'
import './signin.css'
import HttpService from '../services/http-service'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function SignIn() {
  const http = new HttpService();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoading] = useState(false)
  const { user, setCurrentUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let res = await http.loginUser(usernameRef.current.value, passwordRef.current.value)
      setCurrentUser(res.userObj)
      setErrorMessage()
      navigate('/')
      console.log(res)
    } catch (err) {
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex sign-in items-center justify-center'>
      <div className='signup-form flex flex-col justify-center items-center pb-8 pt-8'>
        <Link to='/' className='justify-self-start	self-start ml-4'><ArrowBackIosIcon />Back</Link>
        <h1 className='sm:pt-0 pt-6'>Sign In</h1>
        {loading && <CircularProgress />}
        {errorMessage && <div className='error-message mt-0 mb-2 rounded-md text-white bg-red-400 p-2'>{`${errorMessage}`}</div>}
        <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
          <input className='landing-form' ref={usernameRef} type='text' id='username' placeholder='Username' />
          <input className='landing-form' ref={passwordRef} type='password' id='password' placeholder='Password' />
          <div className='date-picker-wrapper justify-center items-center flex flex-col w-full'>
            <div className='datepicker-wrapper'>
            </div>
          </div>
          <button className='primary-btn mt-10 mb-5'>
            Sign In
          </button>
        </form>
        <p>Don't have an account? <a href='#' className='primary-link'>Sign Up</a></p>
      </div>
    </div>

  )
}
