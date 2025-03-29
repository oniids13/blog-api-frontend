import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import MainContent from './MainContent'
import ErrorPage from '../views/ErrorPage'
import Index from '../views/Index'
import SignUp from '../views/SignupPage'
import Home from '../views/HomePage'
import EditPost from "../views/EditPost"
import AdminRoute from './AdminRoute'
import AdminPage from '../views/AdminPage'
import UnauthorizedPage from '../views/UnauthorizedPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
        path='/'
        element={< MainContent/>}
        errorElement={<ErrorPage/>}
        >
            <Route index element={<Index />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='home' element={<Home />} />
            <Route path='edit/:postId' element={<EditPost />} />

            <Route element={<AdminRoute/>}>
                <Route path='admin' element ={<AdminPage />} />
            </Route>

            <Route path='unauthorized' element={<UnauthorizedPage/>} />
        </Route>
    )
)


export default router