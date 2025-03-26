import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = ({setToken}) => {

    const navigate = useNavigate();
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post("http://localhost:3000/login", formData, {
                headers: {"Content-Type": "application/json"}
            });

            console.log(response)



            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);

            setToken(response.data.token)
           
            navigate("/home");
        } catch (error) {
            console.error(error.message)
            setError("Invalid Login Credentials");
        }
    }


    return(
       <>
       <form className="login-form" onSubmit={handleLogin}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            {error && <p className='text-danger'>{error}</p>}

            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" required onChange={handleChange} />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" required onChange={handleChange} />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
       </>
    )
}



export default Login