import { Link } from 'react-router-dom'
import { useSession } from '../Context/SessionContext'
import style from '../Styles/Header.module.css'


const Header = () => {
  const { user, logOut } = useSession()


  return (
    <div className={style.container}>

      <Link to="/">
    <div className={style.logo}>
      <p>MUMS</p>
      <p>FILIBABBA</p>
    </div>
      </Link>

      <Link to="/user">
        USER PAGE
      </Link>
      {user ?
        <button onClick={logOut}>LOG OUT</button> :
        <Link to="/login">
          <button>LOG IN</button>
        </Link>
      }
    </div>
  )
}

export default Header