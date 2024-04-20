// import styling from '../Styles/SignInForm.module.css'

const SignInForm = () => {
  return (
    <>
      <div className='container'>
        <form>
          <div className='form-floating mb-3'>
            <label htmlFor="floatingInputValue" className="visually-hidden">Email</label>
            <input type="email" className="form-control" id="floatingInputValue" placeholder="exempel@email.com" />
          </div>
          <div className='form-floating mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="*********" />
          </div>
        </form>
      </div>

      {/* <form className={styling.form}>
        <input type="text" placeholder="Email" className="emailInput" />
        <input type="password" placeholder="Password" className="passwordInput"  />
        <button type="submit" className="button">Sign In</button>
      </form> */}
    </>

  )
}

export default SignInForm