// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

// Components
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

const App = () => (
    <>
        <Router>
            <Header />

            <div className="py-5">
                <Routes>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='/' element={<Home />} />
                    </Route>

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/:id/profile' element={<Profile />} />
                </Routes>
            </div>
        </Router>

        <ToastContainer />
    </>
)

export default App;