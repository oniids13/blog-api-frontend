import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header>
            <Link to={'/'}>
                <h1>Blog Book</h1>
            </Link>
            <nav>

                    <Link to={'/signup'}>
                        <button className='btn btn-success'>Sign Up</button>
                    </Link>

            </nav>
        </header>
    )
}

export default Header