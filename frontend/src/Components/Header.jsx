import { Link } from 'react-router-dom'
import { useUser } from '../Context/UserContext'

const Header = () => {
  const { signOutUser, user } = useUser()

  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/user">
        <button>User Page</button>
      </Link>
      {user ?
        <button onClick={signOutUser}>Sign Out</button> :
        <Link to="/login">
          <button>Sign In</button>
        </Link>}
    </div>
  )
}

export default Header