import style from '../Styles/LoginPage.module.css'
import { useState } from 'react';
import SignInForm from "../Components/SignInForm"
import RegisterForm from "../Components/RegisterForm"


function LoginPage() {
  const [haveAccount, setHaveAccount] = useState(true)

  const hasAccountAction = () => {
    setHaveAccount(!haveAccount)
  }

  return (
    <div className={style.loginPage}>
      {haveAccount ? <SignInForm hasAccountAction={hasAccountAction} /> : <RegisterForm hasAccountAction={hasAccountAction} />}
    </div>
  )
}

export default LoginPage