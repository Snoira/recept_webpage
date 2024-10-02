import style from '../Styles/SignInForm.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { useHistory } from 'react-router-dom'

const SignInForm = ({ logIn, showRegisterComp }) => {

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      await logIn(values)
    }
  })

  //kolla bootstrap class rounded

  return (
    <>
      <div className={`col-md-6 ${style.rightBox}`} >
        <div className={`row align-items-center`}>
          <div className={`${style.headerText} mb-4`}>
            <h2>Hello, Again</h2>
            <p>We're happy to have you back.</p>
          </div>

          <form onSubmit={formik.handleSubmit} className='form-floating'>
            <div className='input-group mb-3'>
              <input type="email" id="email"
                className="form-control form-control-lg bg-light fs-6"
                aria-label="email"
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='invalid-feedback'>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className='input-group mb-1'>
              <input type="password" id="password"
                className="form-control form-control-lg bg-light fs-6"
                aria-label="password"
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='invalid-feedback'>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className={`input-group mb-5 d-flex justify-content-between`}>
              <div className={`form-check`}>
                <input type="checkbox" className={`form-check-input`} id='formCheck' />
                <label for="formCheck" className={`form-check-label text-secondary`} htmlFor='formCheck'>
                  <small>Remember Me</small>
                </label>
              </div>
              <div className={`forgot`}>
                <small>
                  <a href="">Forgot Password?</a>
                </small>
              </div>
            </div>
            <div className='input-group mb-3'>
              <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Login</button>
            </div>
          </form>
          <div className={`input-group mb-3`}>
            <button className={`btn btn-lg btn-light w-100 fs-6`}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/36px-Google_%22G%22_logo.svg.png?20230822192911"
                alt="google G icon"
                className={`me-2`} />
              <small>Sign in with Google</small>
            </button>
          </div>
          <div className="row">
            <small>Don't have account?
              <a onClick={showRegisterComp} className="ms-1"> Register account</a>
            </small>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInForm