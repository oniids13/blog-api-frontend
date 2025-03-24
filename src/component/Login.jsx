

const Login = () => {
    return(
       <>
       <form className="login-form">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" required/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" required/>
            <label for="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
       </>
    )
}



export default Login