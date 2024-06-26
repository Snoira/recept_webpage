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
    <div className="login-page">
      {showRegister ? <RegisterForm register={register} showRegisterComp={showRegisterComp} /> : <SignInForm logIn={logIn} showRegisterComp={showRegisterComp} />}
    </div>
  )
}

export default LoginPage