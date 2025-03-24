import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import MainContent from './MainContent'
import ErrorPage from '../views/ErrorPage'
import Index from '../views/Index'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
        path='/'
        element={< MainContent/>}
        errorElement={<ErrorPage/>}
        >
            <Route index element={<Index />} />

        </Route>
    )
)


export default router