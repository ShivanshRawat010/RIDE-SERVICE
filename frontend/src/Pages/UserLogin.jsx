import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
  };

  return (
    <div className='bg-white flex flex-col items-center justify-between h-screen w-full relative'>
      <div className="absolute top-[5%] left-[5%] w-[20%] h-10">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" className='w-full' />
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
        <div className='w-full flex justify-center'>New here? &nbsp; <Link to='/registerUser' className='text-blue-400'>Create new Account</Link></div>
      </div>
      <div className='w-full px-8'>
        <Link to='/captainLogin' className='bg-emerald-500 rounded-md h-12 mb-16 text-white w-full flex items-center justify-center'>
          <h1 className='font-bold'>
            Sign in as Captain
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
