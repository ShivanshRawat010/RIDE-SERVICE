import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({children}) => {

  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!token){
      navigate('/captainLogin')
    }
  }, [token])

  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper
