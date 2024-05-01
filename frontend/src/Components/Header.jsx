import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <Link to="/home">
            <button>Home</button>
        </Link>
        <Link to="/create">
            <button>Create</button>
        </Link>
        <Link to="/">
            <button>Login</button>
        </Link>
    </div>
  )
}

export default Header