import './landing.css'
import { useState } from 'react';
import Datepicker from "tailwind-datepicker-react"



export default function Landing() {
    const [show, setShow] = useState(false)

    // Code provided by tailwind-datepicker-react readme
    // TODO: Provide light/dark theme context

    const options = {
        title: "Birthdate",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: Date.now(), // Pretty weird idea, but the max date should but the current date of which the user is registering
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray-100 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-gray-600",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => <span>Previous</span>,
            next: () => <span>Next</span>,
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    }


    const handleChange = (selectedDate) => {
        console.log(selectedDate)
    }
    const handleClose = (state) => {
        setShow(state)
    }

    return (
        <div className='landing-container flex flex-col sm:flex-row mr-4 ml-4 center-margin'>
            <div className='hero-heading'>
                <h1>
                    Connect, Vibe, and Discover: Your Social Media Journey Starts Here!
                </h1>
                <h2 className='mt-6'>
                    Interact with millions of other users in Vibenet
                </h2>
            </div>
            <div className='signup-form flex flex-col justify-center items-center sm:pb-0 pb-8'>
                <h1 className='sm:pt-0 pt-6'>Let’s get started!</h1>
                <form className='flex flex-col justify-center items-center w-full'>
                    <input className='landing-form' type='text' id='username' placeholder='Username' />
                    <input className='landing-form' type='text' id='password' placeholder='Password' />
                    <input className='landing-form' type='text' id='confpass' placeholder='Confirm Password' />
                    <input className='landing-form' type='text' id='email' placeholder='Email' />


                    <div className='date-picker-wrapper justify-center items-center flex flex-col w-full'>

                        <div className='datepicker-wrapper'>
                            <label for='birthday' className='place-self-start' onClick={handleClose}>Birthdate: </label>
                            <Datepicker id='birthday' options={options} onChange={handleChange} show={show} setShow={handleClose} />
                        </div>
                        <div className='genderpicker-wrapper'>
                            <label for='gender'  className='place-self-start'>Gender: </label>
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
    );
}
