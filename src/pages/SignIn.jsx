import React from 'react'
import './signin.css'
import HttpService from '../services/http-service'

export default function SignIn() {

  
  return (
    <div className='flex sign-in items-center justify-center'>
      <div className='signup-form flex flex-col justify-center items-center pb-8 pt-8'>
        <h1 className='sm:pt-0 pt-6'>Sign In</h1>
        <form className='flex flex-col justify-center items-center w-full'>
          <input className='landing-form' type='text' id='username' placeholder='Username' />
          <input className='landing-form' type='text' id='password' placeholder='Password' />
          <div className='date-picker-wrapper justify-center items-center flex flex-col w-full'>
            <div className='datepicker-wrapper'>
            </div>
          </div>
          <button className='primary-btn mt-10 mb-5'>Sign Up</button>
        </form>
        <p>Don't have an account? <a href='#' className='primary-link'>Sign Up</a></p>
      </div>
    </div>

  )
}
