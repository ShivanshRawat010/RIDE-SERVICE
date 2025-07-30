import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Components/Logo';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
      email: email,
      password: password
    });

    if(res.status === 200) {
      const data = res.data;

      setCaptainData(data.captain);

      localStorage.setItem('token', data.token);

      navigate('/captainHome');
    }
  };

  return (
    <div className='bg-white flex flex-col items-center justify-between h-screen w-full relative'>
      <div className="absolute top-[5%] left-8 w-[20%] h-10">
        <Logo />
      </div>
      <div className='pt-32 w-full px-8'>
        <form onSubmit={submitHandler}>
          <h3 className='font-semibold'>Your e-mail address</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2 mb-6' 
            type="email" 
            placeholder='example@example.com' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h3 className='font-semibold'>Password</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
            type="password" 
            placeholder='enter your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type='submit' 
            className='bg-black text-white w-full h-10 mt-8 mb-2 flex items-center justify-center rounded-md'
          >
            Login
          </button>
        </form>
        <div className='w-full flex justify-center'>New here? &nbsp; <Link to='/registerCaptain' className='text-blue-400'>Create new Account</Link></div>
      </div>
      <div className='w-full px-8'>
        <Link to='/userLogin' className='bg-orange-500 rounded-md h-12 mb-16 text-white w-full flex items-center justify-center'>
          <h1 className='font-bold'>
            Sign in as User
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin
