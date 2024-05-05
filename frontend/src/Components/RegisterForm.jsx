import {useFormik} from "formik"
import * as Yup from "yup"

const RegisterForm = ({register}) => {
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
            <div className='col-auto'>
                <label htmlFor="passwordCheck" className="float-start">Password</label>
                <input type="passwordCheck" id="passwordCheck" className="form-control"
                    value={formik.values.passwordCheck}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
                    <div className='invalid-feedback'>{formik.errors.passwordCheck}</div>
                ) : null}
            </div>
            <div className='col-auto'>
                <label htmlFor="username" className="float-start">Användarnamn</label>
                <input type="username" id="username" className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className='invalid-feedback'>{formik.errors.username}</div>
                ) : null}
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default RegisterForm