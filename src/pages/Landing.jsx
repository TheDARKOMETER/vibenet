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
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-red-500",
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
        defaultDate: new Date("2022-01-01"),
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
        <div className='landing-container page-container flex mr-4 ml-4 center-margin'>
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
                <input className='landing-form' type='text' id='username' placeholder='Username' />
                <input className='landing-form' type='text' id='password' placeholder='Password' />
                <input className='landing-form' type='text' id='confpass' placeholder='Confirm Password' />
                <input className='landing-form' type='text' id='email' placeholder='Email' />
                <div className='date-picker-wrapper flex flex-row items-center w-80'>
                    <span>Birthdate: </span>
                    <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                    <input className='landing-form' type='text' id='gender'></input>
                </div>
            </div>
        </div>
    );
}
