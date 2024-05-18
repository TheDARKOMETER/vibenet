import './landing.css'
import { useEffect, useRef, useState } from 'react';
import Datepicker from "tailwind-datepicker-react"
import HttpService from '../services/http-service'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const [show, setShow] = useState(false)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()
    const genderRef = useRef()
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState()
    const [birthdate, setBirhdate] = useState()
    const { currentUser, setCurrentUser } = useAuth()
    const http = new HttpService()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard')
        }
    }, [currentUser])
    
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
            disabledText: "bg-red-100",
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
        setBirhdate(selectedDate)
    }
    const handleClose = (state) => {
        setShow(state)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let collectedErrors = {}
        let isExistingUser
        try {
            isExistingUser = await http.checkUsernameAvailability(usernameRef.current.value)
        } catch (err) {
            collectedErrors.serverError = err.message
        }


        if (!usernameRef.current.value) {
            collectedErrors.username = "Username is required"
        }

        if (isExistingUser) {
            collectedErrors.isTaken = "Username already taken"
        }


        if (!passwordRef.current.value || passwordRef.current.value.length < 6) {
            collectedErrors.password = "Please enter a valid password, with atleast 6 characters"
        }
        if ((passwordRef.current.value !== confirmPassRef.current.value) && passwordRef.current.value) {
            collectedErrors.passwordMatch = "Password does not match"
        }
        if (!emailRef.current.value || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(emailRef.current.value)) {
            collectedErrors.email = "Enter a valid email"
        }

        const currentDate = Date.now()
        const dateDiff = currentDate - birthdate
        const dateDiffYear = Math.floor(dateDiff / (3.154 * Math.pow(10, 10)))
        if (!birthdate || dateDiffYear < 13) {
            collectedErrors.birthdate = "Enter a valid birthdate or you must be atleast 13 years old"
        }
        setErrors(collectedErrors)

        if (Object.keys(collectedErrors).length === 0) {
            http.addUser(usernameRef.current.value, passwordRef.current.value, emailRef.current.value, birthdate, genderRef.current.value)
                .then(res => console.log(res)).catch(err => {
                    console.log(err.response.data.error)
                    let newErr = (err.response.data.error) ? err.response.data.error : err.message
                    collectedErrors.serverError = newErr
                    console.log(collectedErrors)
                    setErrors(collectedErrors)
                })
        }
        alert("Submitted")
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setErrorMessage(outputMessages(errors))
        }

    }, [errors])

    useEffect(() => {
        console.log(errorMessage)
    }, [errorMessage])

    const outputMessages = (errors) => {
        // Return the first error only
        for (const key in errors) {
            console.log(errors[key])
            return errors[key]
        }
    }

    return (
        <div className='landing-container flex flex-col sm:flex-row'>
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

                {errorMessage && <div className='error-message mt-0 mb-2 rounded-md text-white bg-red-400 p-2'>{`${errorMessage}`}</div>}

                <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
                    <input className='landing-form' ref={usernameRef} type='text' id='username' placeholder='Username' />
                    <input className='landing-form' ref={passwordRef} type='password' id='password' placeholder='Password' />
                    <input className='landing-form' ref={confirmPassRef} type='password' id='confpass' placeholder='Confirm Password' />
                    <input className='landing-form' ref={emailRef} type='email' id='email' placeholder='Email' />


                    <div className='date-picker-wrapper justify-center items-center flex flex-col w-full'>

                        <div className='datepicker-wrapper'>
                            <label htmlFor='birthday' className='place-self-start' onClick={handleClose}>Birthdate: </label>
                            {/* I just realized you can use the default input type date instead of this shit */}
                            <Datepicker id='birthday' options={options} onChange={handleChange} show={show} setShow={handleClose} />
                        </div>
                        <div className='genderpicker-wrapper'>
                            <label htmlFor='gender' className='place-self-start'>Gender: </label>
                            <div className='flex items-center justify-center'>
                                <select defaultValue={'none'} ref={genderRef} className='landing-form' id='gender'>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='none'>Rather not say</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <button className='mt-10 mb-5 primary-btn' type='submit'>Sign Up</button>
                </form>
                <p>Already have an account? <a href='#' className='primary-link'>Sign In</a></p>
            </div>

        </div>
    );
}
