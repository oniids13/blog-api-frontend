import { Link } from 'react-router-dom'
import Logout from './LogoutBtn'


const Header = ({token, setToken}) => {

    return (
        <header>
            <div>
                <h1>Blog Book</h1>
                <small>Blogging with passion</small>
            </div>
            <nav>
                    {!token ? (
                        <Link to={'/signup'}>
                            <button className='btn btn-success'>Sign Up</button>
                        </Link>
                    ) : (
                        <Logout setToken={setToken} />
                    )}
                   
            </nav>
        </header>
    )
}

export default Header