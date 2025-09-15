import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import style from '../Styles/LoginPage.module.css'
import { useSession } from '../Hooks/useSession.js'
import { TextInput } from './global/Inputs'
import Button from './global/Button'



const SignInForm = () => {

  const { logInFunc, logIn } = useSession()

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required')
      .trim(),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required')
      .trim()
  })

  if (logIn.isLoading) {
    return <div className={style.formContainer}>Logging in...</div>
  }

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={logInFunc}>
        <Form className="flex flex-col gap-8 w-full">
          <TextInput
            label="Email"
            name="email"
            type="email"
            id="email"
            labelText="bold"
            fieldStyle="line"
            labelStyle="floating"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            id="password"
            labelText="bold"
            fieldStyle="line"
            labelStyle="floating"
          />
          <Button type="submit" span="full">Log In</Button>
        </Form>
      </Formik>
    </>
  )
}

export default SignInForm