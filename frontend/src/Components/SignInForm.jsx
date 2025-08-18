import { useFormik } from 'formik'
import * as Yup from 'yup'
import style from '../Styles/LoginPage.module.css'
import axios from 'axios';
import { useUser } from '../Context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'

const SignInForm = ({hasAccountAction}) => {

  const { signInUser } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const logIn = async (inputs) => {
    try {
      const res = await axios.post(`${AUTH_URL}/login`, inputs)
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
    <div className={style.formContainer}>
      <h2 className={style.cardHeading}>
        Log in!
      </h2>

      <form onSubmit={formik.handleSubmit} className={style.cardForm}>
        <div className={style.input}>
          {formik.touched.email && formik.errors.email ? (
            <div className='invalid-feedback'>{formik.errors.email}</div>
          ) : null}
          <input type="email" id="email" className={`${style.inputField} ${formik.touched.email ? (formik.errors.email ? style.isInvalid : style.isValid) : ''}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <label htmlFor="email" className={style.inputLabel}>Email </label>
        </div>
        <div className={style.input}>
          {formik.touched.password && formik.errors.password ? (
            <div className='invalid-feedback'>{formik.errors.password}</div>
          ) : null}
          <input type="password" id="password" className={`${style.inputField} ${formik.touched.password ? (formik.errors.password ? style.isInvalid : style.isValid) : ''}`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <label htmlFor="password" className={style.inputLabel}>Password</label>
        </div>
        <div className={style.action}>
          <button type="submit" className={style.actionButton}>Log In</button>
        </div>
      </form>
      <div className={style.cardInfo}>
        <p>Don't have an account? <button onClick={hasAccountAction}>Sign up</button></p>
      </div>
    </div>

  )
}

export default SignInForm