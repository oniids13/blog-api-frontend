import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router-dom"


const MainContent = () => {
    return(
        <>
        <Header/>
        <Outlet />
        <Footer/>
        </>
    )
}


export default MainContent