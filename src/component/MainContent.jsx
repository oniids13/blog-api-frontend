import Header from "../component/Header"
import Footer from "../component/Footer"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"


const MainContent = () => {

    const [token, setToken] = useState(localStorage.getItem("token"))

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