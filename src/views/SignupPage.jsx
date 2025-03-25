

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
    return (
        <>
         <div className="signup-page">
             <form action="/sign-up" method="POST" className="signup-form">
                     <h2>Sign Up!</h2>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Juan Dela Cruz" name="fullName" required/>
                    <label for="floatingInput">Full Name</label>
                    </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="Wassup13" name="username" required/>
                  <label for="floatingInput">Username</label>
                </div>
              <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" required/>
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" required/>
                  <label for="floatingPassword">Password</label>
                </div>
                <div className="form-check mt-1">
                  <input className="form-check-input" type="checkbox" id="flexCheck" name="admin" value="true"/>
                  <label className="form-check-label" for="flexCheck">
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