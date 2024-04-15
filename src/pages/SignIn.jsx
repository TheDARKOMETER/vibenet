import React from 'react'
import './signin.css'

export default function SignIn() {
  return (
    <div className='flex sign-in items-center justify-center'>
      <div className='signup-form flex flex-col justify-center items-center sm:pb-0 pb-8 pt-8'>
        <h1 className='sm:pt-0 pt-6'>Sign In</h1>
        <form className='flex flex-col justify-center items-center w-full'>
          <input className='landing-form' type='text' id='username' placeholder='Username' />
          <input className='landing-form' type='text' id='password' placeholder='Password' />
          <input className='landing-form' type='text' id='confpass' placeholder='Confirm Password' />
          <input className='landing-form' type='text' id='email' placeholder='Email' />


          <div className='date-picker-wrapper justify-center items-center flex flex-col w-full'>

            <div className='datepicker-wrapper'>
            </div>
            <div className='genderpicker-wrapper'>
              <label htmlFor='gender' className='place-self-start'>Gender: </label>
              <select className='landing-form' id='gender'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='none'>Rather not say</option>
              </select>
            </div>
          </div>
          <button className='primary-btn'>Sign Up</button>
        </form>
        <p>Already have an account? <a href='#' className='primary-link'>Sign In</a></p>
      </div>
    </div>

  )
}
