import { useFormik } from "formik"
import * as Yup from "yup"
import style from '../Styles/LoginPage.module.css'
import axios from 'axios';
import { useUser } from '../Context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'

const AUTH_URL = `${import.meta.env.API_URL || 'http://localhost:8080'}/auth`;

const RegisterForm = ({hasAccountAction}) => {

    const { signInUser } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    const register = async (inputs) => {
    try {
        const res = await axios.post(`${AUTH_URL}/register`, inputs)
        if (res.status === 201) {

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
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must contain at least one letter, one number and one special character'
            )
            .required('Password is required'),
        passwordCheck: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required(' Password confirmation is required'),
        username: Yup.string()
            .required('Username is required')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordCheck: '',
            username: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await register(values)
        }
    })

    return (
        <div className={style.formContainer}>
            <h2 className={style.cardHeading}>
                Sign up!
            </h2>
            <form onSubmit={formik.handleSubmit} className={style.cardForm}>

                <div className={style.input}>
                    {formik.touched.email && formik.errors.email ? (
                        <span className='invalid-feedback'>{formik.errors.email}</span>
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
                        <span className='invalid-feedback'>{formik.errors.password}</span>
                    ) : null}
                    <input type="password" id="password" className={`${style.inputField} ${formik.touched.password ? (formik.errors.password ? style.isInvalid : style.isValid) : ''}`}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <label htmlFor="password" className={style.inputLabel}>Password</label>
                </div>
                <div className={style.input}>
                    {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
                        <span className='invalid-feedback'>{formik.errors.passwordCheck}</span>
                    ) : null}
                    <input type="password" id="passwordCheck" className={`${style.inputField} ${formik.touched.passwordCheck ? (formik.errors.passwordCheck ? style.isInvalid : style.isValid) : ''}`}
                        value={formik.values.passwordCheck}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <label htmlFor="passwordCheck" className={style.inputLabel}>Confirm Password</label>
                </div>
                <div className={style.input}>
                    {formik.touched.username && formik.errors.username ? (
                        <span className='invalid-feedback'>{formik.errors.username}</span>
                    ) : null}
                    <input type="username" id="username" className={`${style.inputField} ${formik.touched.username ? (formik.errors.username ? style.isInvalid : style.isValid) : ''}`}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <label htmlFor="username" className={style.inputLabel}>Användarnamn</label>
                </div>
                <div className={style.action}>
                    <button type="submit" className={style.actionButton}>Create account</button>
                </div>
            </form>
            <div className={style.cardInfo}>
                <p>Already have an account? <button onClick={hasAccountAction}>Log in</button></p>
            </div>
        </div>
    )
}

export default RegisterForm