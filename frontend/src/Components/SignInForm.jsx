// import styling from '../Styles/SignInForm.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    }

  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password })
    if (res.status === 200) {
      console.log(res.data)
    } else {
      console.log('Error') //display error message, div or alert?
    }
  }

  return (
    <>
      {/* <div> */}
      {/* <div className='bg-light'> */}
      <form >
        {/* <div className='mb-3'>
          <label htmlFor="email" className="float-start">Email</label>
          <input type="email" id="email" className="form-control" placeholder="exempel@email.com"
            value={email} />
        </div> */}
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          <input type="text" className="grow" placeholder="Email" />
        </label>
        {/* <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" placeholder="*********"
            value={password} onVolumeChange={e => setPassword(e.target.value)} />
        </div> */}
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" className="grow" value="password" />
        </label>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      {/* </div> */}

    </>

  )
}

export default SignInForm