import { Link } from "react-router-dom"

const ErrorPage = () => {
    return(
        <>
            <div className="container pt-5 text-center">
                <h1>Oh no! The Page your looking for doesn't exist</h1>
                <button className="btn btn-primary"><Link className="link" to='/'>Go Back!</Link></button>
            </div>
        </>
    )
}


export default ErrorPage