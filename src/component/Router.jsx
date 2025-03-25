import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import MainContent from './MainContent'
import ErrorPage from '../views/ErrorPage'
import Index from '../views/Index'
import SignUp from '../views/SignupPage'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
        path='/'
        element={< MainContent/>}
        errorElement={<ErrorPage/>}
        >
            <Route index element={<Index />} />
            <Route path='signup' element={<SignUp />} />
        </Route>
    )
)


export default router