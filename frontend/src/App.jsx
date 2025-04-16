import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home'
import RegisterUser from './Pages/UserRegister'
import UserLoginPage from './Pages/UserLogin'
import CaptainLoginPage from './Pages/CaptainLogin'
import RegisterCaptain from './Pages/CaptainRegister'
import StartPage from './Pages/Start'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainHome from './Pages/CaptainHome'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper'
import CaptainLogout from './Pages/CaptainLogout'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<StartPage/>} />
      <Route path="/registerUser" element={<RegisterUser/>} /> 
      <Route path="/registerCaptain" element={<RegisterCaptain/>} /> 
      <Route path="/userLogin" element={<UserLoginPage/>} /> 
      <Route path="/captainLogin" element={<CaptainProtectedWrapper>
        <CaptainLoginPage/>
      </CaptainProtectedWrapper>} />
      <Route path="/home" element={<UserProtectedWrapper>
        <HomePage/>
      </UserProtectedWrapper>} /> 
      <Route path="/logoutUser" element={<UserLogout/>} />
      <Route path='/captainHome' element={<CaptainProtectedWrapper>
        <CaptainHome/>
      </CaptainProtectedWrapper>}/>
      <Route path="/logoutCaptain" element={<CaptainProtectedWrapper>
        <CaptainLogout/>
      </CaptainProtectedWrapper>} />
    </Routes>
  )
}

export default App
