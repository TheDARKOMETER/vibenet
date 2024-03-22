import './landing.css'
import { useState } from 'react';
import DatePicker from "react-datepicker";

export default function Landing() {
    const [birthday, setBirthday] = useState(new Date())

    return (
        <div className='landing-container page-container flex  mr-4 ml-4 center-margin'>
            <div className='hero-heading'>
                <h1>
                    Connect, Vibe, and Discover: Your Social Media Journey Starts Here!
                </h1>
                <h2 className='mt-6'>
                    Interact with millions of other users in Vibenet
                </h2>
            </div>
            <div className='signup-form flex flex-col justify-center items-center'>
                <h1>Let’s get started!</h1>
                <input type='text' id='username' placeholder='Username' />
                <input type='text' id='password' placeholder='Password' />
                <input type='text' id='confpass' placeholder='Confirm Password' />
                <input type='text' id='email' placeholder='Email' />
                <DatePicker selected={birthday} onChange={(date) => setBirthday(date)} />
            </div>
        </div>
    );
}
