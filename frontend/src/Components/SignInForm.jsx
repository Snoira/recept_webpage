import style from '../Styles/LoginPage.module.css'
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
              <div className={`row`}>
                <small>Don't have account?
                  <a onClick={showRegisterComp} className={`ms-1`}> Register account</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit} className='form-floating'>
        <div className='col-auto'>
          <label htmlFor="email" className="float-start">Email</label>
          <input type="email" id="email" className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='invalid-feedback'>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='col-auto'>
          <label htmlFor="password" className="float-start">Password</label>
          <input type="password" id="password" className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='invalid-feedback'>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <button onClick={showRegisterComp}>Register account</button>
       */}


      {/* <div> */}
      {/* <div className='bg-light'>
      <form >
        <div className='mb-3'>
          <label htmlFor="email" className="float-start">Email</label>
          <input type="email" id="email" className="form-control" placeholder="exempel@email.com"
            value={email} />
        </div>
        
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="text" placeholder="Email" 
          className={`form-control ${formik.touched.imageURL ? formik.errors.imageURL ? "is-invalid" : "is-valid" : ""}`}
          {...formik.getFieldProps("imageURL")} />
        </label>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" placeholder="*********"
            value={password} onVolumeChange={e => setPassword(e.target.value)} />
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" value="password"
          className={`form-control ${formik.touched.imageURL ? formik.errors.imageURL ? "is-invalid" : "is-valid" : ""}`}
          {...formik.getFieldProps("imageURL")} />
        </label>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      </div> */}

    </>

  )
}

export default SignInForm