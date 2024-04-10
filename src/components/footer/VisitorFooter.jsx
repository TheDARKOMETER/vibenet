import './visitorfooter.css'
export function VisitorFooter() {
    return (
        <footer className='center-margin pt-4 pb-2'>
            <nav className='flex flex-col sm:flex-row justify-center items-center text-white'>
                <ul className='flex flex-col sm:flex-row text-center sm:text-left'>
                    <li><a href='#'>Terms of Service</a></li>
                    <li><a href='#'>Privacy Policy</a></li>
                    <li><a href='#'>Accessibility</a></li>
                    <li><a href='#'>Developers</a></li>
                </ul>
                <span>© 2024 Vibenet Corp.</span>
            </nav>
        </footer>
    )
}
