import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    return (
        <>
        <div className="wrapper">
            <SignUpForm/>
        </div>
        </>
    )
}


const SignUpForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState("");



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/signup", formData, {
        headers: {"Content-Type": "application/json"}
      });

      console.log(response);
      navigate('/');
    } catch (err) {
      console.error(err.message)
    }
  }



    return (
        <>
         <div className="signup-page">
             <form action="/sign-up" method="POST" className="signup-form" onSubmit={handleSignUp}>
                     <h2>Sign Up!</h2>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" name="fullname" onChange={handleChange} required/>
                    <label htmlFor="floatingInput">Full Name</label>
                    </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput"  name="username" onChange={handleChange} required/>
                  <label htmlFor="floatingInput">Username</label>
                </div>
              <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput"  name="email" onChange={handleChange} required/>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword"  name="password" onChange={handleChange} required/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-check mt-1">
                  <input className="form-check-input" type="checkbox" id="flexCheck" name="isAdmin" onChange={handleChange} value="true"/>
                  <label className="form-check-label" htmlFor="flexCheck">
                    Are you an admin?
                  </label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                   </form>
         </div>
        </>
    )
}


export default SignUp