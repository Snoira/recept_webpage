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
      <div className={style.formContainer}>
        <h2 className={style.cardHeading}>
          {haveAccount ? "Welcome back!" : "Join us!"}
        </h2>
        <div className={style.cardForm}>

          {haveAccount ? <SignInForm hasAccountAction={hasAccountAction} /> : <RegisterForm hasAccountAction={hasAccountAction} />}
        </div>
        <div className={style.cardInfo}>
          {
            haveAccount ?
              <p>Don't have an account? <button onClick={hasAccountAction}>Sign up</button></p> :
              <p>Already have an account? <button onClick={hasAccountAction}>Sign in</button></p>
          }
        </div>
      </div>
    </div>
  )
}

export default LoginPage