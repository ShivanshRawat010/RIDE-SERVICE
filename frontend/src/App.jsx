import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/Home'
import RegisterUser from './Pages/UserRegister'
import UserLoginPage from './Pages/UserLogin'
import CaptainLoginPage from './Pages/CaptainLogin'
import RegisterCaptain from './Pages/CaptainRegister'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/registerUser" element={<RegisterUser/>} /> 
      <Route path="/registerCaptain" element={<RegisterCaptain/>} /> 
      <Route path="/userLogin" element={<UserLoginPage/>} /> 
      <Route path="/captainLogin" element={<CaptainLoginPage/>} /> 
    </Routes>
  )
}

export default App
