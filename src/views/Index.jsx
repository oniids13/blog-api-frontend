import { useOutletContext } from "react-router-dom"
import Login from "../component/Login.jsx"

const Index = () => {

    const {setToken} = useOutletContext();

    return (
        <>
        <div className="wrapper">
            <Login setToken={setToken} />
        </div>
        </>
    )
}




export default  Index