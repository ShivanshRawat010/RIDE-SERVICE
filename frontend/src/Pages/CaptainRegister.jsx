import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';

const CaptainRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain, setCaptain} = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if(response.status === 201) {
      const data = response.data;

      setCaptain(data.captain);

      localStorage.setItem('token', data.token);

      navigate('/captainHome');
    }
  }

  return (
    <div className='bg-white flex flex-col items-center justify-between h-screen w-full relative'>
      <div className="absolute top-[5%] left-[5%] w-[20%] h-10">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" className='w-full' />
      </div>
      <div className='pt-32 w-full px-8'>
        <form onSubmit={submitHandler}>
          <h3 className='font-semibold'>What's you name?</h3>
          <div className='flex justify-between gap-x-2 mb-4'>
            <input 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
              type="text" 
              placeholder='First Name'
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              required 
            />
            <input 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
              type="text" 
              placeholder='Last Name' 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              required 
            />
          </div>
          <h3 className='font-semibold'>What's your e-mail address</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2 mb-4' 
            type="email" 
            placeholder='example@example.com' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h3 className='font-semibold'>Enter Password</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2 mb-4' 
            type="password" 
            placeholder='Enter your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <h3 className='font-semibold'>Vehicle Information</h3>
          <div className='flex gap-2 mt-2'>
            <input
              value = {color}
              onChange={(e) => setColor(e.target.value)}
              type="text" 
              placeholder='Vehicle color' 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-[50%]' 
              required 
            />
            <input 
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              type="text" 
              placeholder='Plate No.' 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-[50%]' 
              required 
            />
          </div>
          <div className='flex gap-2 mt-2'>
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="text" 
              placeholder='Vehicle capacity' 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-[50%]' 
              required 
            />
            <select 
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-[50%] text-gray-400' 
              required 
            >
              <option value="">Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
            
          </div>
          <button 
            type='submit' 
            className='bg-black text-white w-full h-10 mt-8 mb-2 flex items-center justify-center rounded-md'
          >
            Register Captain
          </button>
        </form>
        <div className='w-full flex justify-center text-[15px]'>Already hava an account? &nbsp; <Link to='/captainLogin' className='text-blue-400'>Login here</Link></div>
      </div>
      <div className='w-full px-8 pb-8 text-[11px] text-gray-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam nemo odio voluptate ipsa deserunt ad asperiores tempore! Quos, aperiam iusto!
      </div>
    </div>
  );
}

export default CaptainRegister
