import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import UserPage from './Pages/UserPage'
import PrivateRoute from './Components/PrivateRoute'
import { UserProvider } from './Context/UserContext'
import { ToasterProvider } from './Context/ToasterContext'
import { ToastContainer } from 'react-toastify'
import Header from './Components/Header'
import RecepiePage from './Pages/RecepiePage'

function App() {


  return (
    <>
      <UserProvider>
        <ToasterProvider>
        <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path="/recepie/:recepieId" element={<RecepiePage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
        </ToasterProvider>
      </UserProvider>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  )
}

export default App
