import { useFormik } from "formik"
import * as Yup from "yup"
import style from '../Styles/SignInForm.module.css'


const RegisterForm = ({ register, showRegisterComp }) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Required'),
        passwordCheck: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        username: Yup.string()
            .required('Required')
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
        <>
            <div className={`col-md-6 ${style.rightBox}`} >
                <div className={`row align-items-center`}>
                    <div className={`${style.headerText} mb-4`}>
                        <h2>Welcome</h2>
                        <p>We're happy to have you here.</p>
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
                        <div className='input-group mb-3'>
                            <input type="username" id="username"
                                className="form-control form-control-lg bg-light fs-6"
                                aria-label="username"
                                placeholder='Username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className='invalid-feedback'>{formik.errors.username}</div>
                            ) : null}
                        </div>
                        <div className='input-group mb-3'>
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
                        <div className='input-group mb-3'>
                            <input type="password" id="passwordCheck"
                                className="form-control form-control-lg bg-light fs-6"
                                aria-label="passwordCheck"
                                placeholder='Confirm Password'
                                value={formik.values.passwordCheck}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
                                <div className='invalid-feedback'>{formik.errors.passwordCheck}</div>
                            ) : null}
                        </div>
                        <div className='input-group mb-3'>
                            <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Create An Account</button>
                        </div>
                    </form>
                    <div className="row">
                        <small>I have an existing account
                            <a onClick={showRegisterComp} className="ms-1"> Login</a>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterForm