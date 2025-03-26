import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({setToken}) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout')

            localStorage.removeItem("token");
            setToken(null)

            navigate("/")
        } catch(err) {
            console.error("Logout failed", err)
        }
    }

    return <button onClick={handleLogout} className="btn btn-danger">Logout</button>;
}

export default Logout