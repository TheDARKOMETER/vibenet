import { useEffect, useState } from 'react';

export default function Landing() {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768)
    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        console.log(window.innerWidth)
        console.log(isMobileView)
    }, [window.innerWidth, isMobileView])

    return (
        <>
            {/*<h1>{isMobileView.toString()}</h1>*/}
            {/* <div className='center-margin hero-section'>
            <h1 className='text-8xl font-semibold w-1/2'>
              Connect, Vibe, and Discover: Your Social Media Journey Starts Here!
            </h1>
          </div> */}
        </>
    );
}
