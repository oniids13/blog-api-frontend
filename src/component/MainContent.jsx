import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"


const MainContent = () => {

    const userData = JSON.parse(localStorage.getItem("userData"));

    const [token, setToken] = useState(userData.token)

    useEffect(() => {
        const updateToken = () => setToken(localStorage.getItem("token"))
        window.addEventListener("storage", updateToken)

        return () => window.removeEventListener("storage", updateToken)
    }, [])

    return(
        <>
        <Header token={token} setToken={setToken}/>
        <Outlet context={{setToken}} />
        <Footer/>
        </>
    )
}


export default MainContent