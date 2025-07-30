import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import Logo from '../../Components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;

      setUser(data.user);

      localStorage.setItem('token', data.token);    
      navigate('/home');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='bg-white flex flex-col items-center justify-between h-screen w-full relative overflow-hidden'>
      <div className="absolute top-[5%] left-8 w-[20%] h-10">
        <Logo/>
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
