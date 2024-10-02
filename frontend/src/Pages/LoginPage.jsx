import style from '../Styles/LoginPage.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import SignInForm from "../Components/SignInForm"
import RegisterForm from "../Components/RegisterForm"

function LoginPage() {
  const [showRegister, setShowRegister] = useState(false)
  const { signInUser, } = useUser()

  const navigate = useNavigate()
  const location = useLocation()

  const logIn = async (inputs) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', inputs)
      if (res.status === 200) {

        console.log(res.data)
        signInUser(res.data)
        navigate(location.state?.from ? location.state.from : '/')

      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const register = async (inputs) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', inputs)
      if (res.status === 201) {

        signInUser(res.data)
        setShowRegister(false)
        navigate(location.state?.from ? location.state.from : '/')

      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const showRegisterComp = () => {
    setShowRegister(!showRegister)
  }

  return (
    <div
      className={style.background}
      >
      <div
        className={`d-flex justify-content-center align-items-center min-vh-100 ${style.container}`}
      >
        <div className={`row border rounded-lg p-3 bg-white shadow ${style.boxArea}`}>
          <div className={`col-md-6 rounded-lg d-flex justify-content-center align-content-center flex-column ${style.leftBox}`}>
            <div className={`${style.featuredImage} mb-3`}>
              <img src="https://picsum.photos/id/429/400/500"
                alt="placeholder image"
                className={`${style.imgEl} img-fluid`} />
            </div>
          </div>
        {showRegister ? <RegisterForm register={register} showRegisterComp={showRegisterComp} /> : <SignInForm logIn={logIn} showRegisterComp={showRegisterComp} />}
        </div>
      </div>
    </div>
  )
}

export default LoginPage