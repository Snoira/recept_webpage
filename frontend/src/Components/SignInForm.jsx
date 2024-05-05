import { useFormik } from 'formik'
import * as Yup from 'yup'

const SignInForm = ({ logIn }) => {

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

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='form-floating'>
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