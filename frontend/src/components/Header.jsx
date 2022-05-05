import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate('/login')
    }

    return (
        <header className='shadow-sm'>
            <div className="container py-2">
                <div className="row align-items-center">
                    <div className="col">
                        <Link to='/' className='text-dark text-decoration-none'><p className='mb-0 lead'>Support Desk</p></Link>
                    </div>

                    <div className="col text-end">
                        <nav>
                            <ul className='mb-0'>
                                <li className='d-inline-block border-end pe-3 me-3'>New Support Ticket</li>
                                {user &&<li className='d-inline-block' style={{ cursor: 'pointer' }} onClick={onLogout}>Logout</li>}
                                {user &&<li className='d-inline-block ms-3'><Link to='/profile' className='text-dark text-decoration-none'>Profile</Link></li>}
                                {!user && <li className='d-inline-block'><Link to='/login' className='text-dark text-decoration-none'>Login</Link></li>}
                                {!user && <li className='d-inline-block ms-3'><Link to='/register' className='text-dark text-decoration-none'>Register</Link></li>}
                            </ul>
                        </nav>
                    </div>
                </div>
                
            </div>
        </header>
    )
}

export default Header