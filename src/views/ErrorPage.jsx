import { Link } from "react-router-dom"

const ErrorPage = () => {
    return(
        <>
            <div className="container pt-5 text-center">
                <h1>Oh no! The Page your looking for doesn't exist</h1>
                <Link className="link" to='/home'><button className="btn btn-primary">Go Back!</button></Link>
            </div>
        </>
    )
}


export default ErrorPage