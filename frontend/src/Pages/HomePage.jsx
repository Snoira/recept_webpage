// import RenderRecepies from '../Components/RenderRecepies.jsx';
// import Header from '../Components/Header.jsx';
import { useState } from 'react';
import axios from 'axios';
import SignInForm from "../Components/SignInForm"
import RegisterForm from "../Components/RegisterForm"
import RecepieForm from '../Components/RecepieForm';
import api from '../api';

function HomePage() {
  const [existingAccount, setExistingAccount] = useState(true)
  const [subRecepies, setSubRecepies] = useState([])

  const logIn = async (inputs) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', inputs)
      if (res.status === 200) {
        const token = res.data.accessToken
        localStorage.setItem('token', token)
        console.log('Logged in', token)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const register = async (inputs) => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', inputs)
      if (res.status === 201) {
        console.log('Registered', res.data)
        localStorage.setItem('token', token)
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log('Error', error)
    }
  }

  const addSubRecepie = (recepie) => {
    setSubRecepies([...subRecepies, recepie])
  }

  const createRecepie = async (inputs) => {
    const recepie = {...inputs, subRecepies: subRecepies}
    try {
      const res = await api.post('http://localhost:5000/recepies/create', recepie)
      if (res.status === 201) {
        console.log(res.data)
      } else {
        console.log("Error creating recepie", res.message)
      }
    } catch (error) {
      console.log("Error creating recepie", error)
    }
  }

  return (
    <>
      <div>
        {existingAccount ? <SignInForm logIn={logIn} /> : <RegisterForm register={register} />}
        <button onClick={() => setExistingAccount(!existingAccount)}>{existingAccount ? "Create new account" : "I have an account"}</button>
      </div>
      <RecepieForm createRecepie={createRecepie} addSubRecepie={addSubRecepie} />
    </>
  )
}

export default HomePage