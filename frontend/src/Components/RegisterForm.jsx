import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import style from '../Styles/LoginPage.module.css'
import { useSession } from '../Hooks/useSession.js'
import { TextInput } from './global/Inputs'
import Button from './global/Button'

const RegisterForm = () => {

    const { register } = useSession()


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

    const initialValues = {
        email: '',
        password: '',
        passwordCheck: '',
        username: ''
    }

    const handleSubmit = async (values) => {
        try {
            await register(values)
        } catch (error) {
            //snygga till senare med modal eller liknande 
            alert(error.message)
        }
    }

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-8 w-full">
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        id="email"
                        labelText="bold"
                        fieldStyle="line"
                        labelStyle="floating" />
                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        id="password"
                        labelText="bold"
                        fieldStyle="line"
                        labelStyle="floating" />
                    <TextInput
                        label="Confirm Password"
                        name="passwordCheck"
                        type="password"
                        id="passwordCheck"
                        labelText="bold"
                        fieldStyle="line"
                        labelStyle="floating" />
                    <TextInput
                        label="Username"
                        name="username"
                        type="text"
                        id="username"
                        labelText="bold"
                        fieldStyle="line"
                        labelStyle="floating" />
                    <Button type="submit">Sign Up</Button>
                </Form>
            </Formik>
        </>
    )
}

export default RegisterForm