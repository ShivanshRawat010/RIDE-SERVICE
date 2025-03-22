import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/logout`).then((response) => {
      if(response.status === 200) {
        localStorage.removeItem('token');
        navigate('/userLogin');
      }
    })
  }
  , [])
        

  return (
    <div>
      Logging out...
    </div>
  )
}

export default UserLogout
