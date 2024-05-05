import './App.css'
import { Routes, Route } from 'react-router-dom'
// import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
// import CreateRecepie from './Pages/CreateRecepie'
// import PrivateRoute from './Components/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateRecepie />} /> */}
        {/* <PrivateRoute path="/private" element={<div>Private</div>} /> */}
      </Routes>
    </>
  )
}

export default App
