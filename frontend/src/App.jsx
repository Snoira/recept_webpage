import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import UserPage from './Pages/UserPage'
import PrivateRoute from './Components/PrivateRoute'
import { SessionProvider } from './Context/SessionContext'
import Header from './Components/Header'
import RecepiePage from './Pages/RecepiePage'

function App() {


  return (
    <>
        <SessionProvider>
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
        </SessionProvider>
    </>
  )
}

export default App
