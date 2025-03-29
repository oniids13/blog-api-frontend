import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import router from './component/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
