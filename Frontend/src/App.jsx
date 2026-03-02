import React, { useContext } from 'react'
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

const App = () => {

  useContext
  return (
    <div>
      <Routes>
         <Route path="/" element={<Start />} />
         <Route path="/login" element={<UserLogin />} />
         <Route path="/signup" element={<UserSignup />} />
         <Route path="/captain-login" element={<CaptainLogin />} />
         <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path="/home" element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          } />
      </Routes>
    </div>
  )
}

export default App