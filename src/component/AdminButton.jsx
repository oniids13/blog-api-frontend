import { Link } from "react-router-dom";


const AdminButton = () => {
    const userData = JSON.parse(localStorage.getItem("userData"))


    if (!userData || userData.role !== "ADMIN") {
        return null
    }

    return (
       <Link to="/admin">
            <button className="btn btn-sm btn-info">Admin Page</button>
       </Link>
    )
}


export default AdminButton