import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='shadow-sm'>
            <div className="container py-1">
                <div className="row align-items-center">
                    <div className="col">
                        <Link to='/' className='text-dark text-decoration-none'><h1 className='display-6'>Support Desk</h1></Link>
                    </div>

                    <div className="col text-end">
                        <nav>
                            <ul className='mb-0'>
                                <li className='d-inline-block border-end pe-3 me-3'>New Support Ticket</li>
                                <li className='d-inline-block'><Link to='/login' className='text-dark text-decoration-none'>Login</Link></li>
                                <li className='d-inline-block ms-3'><Link to='/register' className='text-dark text-decoration-none'>Register</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
            </div>
        </header>
    )
}

export default Header