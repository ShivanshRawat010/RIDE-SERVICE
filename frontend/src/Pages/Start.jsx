import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo';

const Start = () => {
  return (
    <div className='w-full h-screen relative'>
      <div className="top bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Modern_British_LED_Traffic_Light.jpg/440px-Modern_British_LED_Traffic_Light.jpg)] h-[75%] w-full bg-center bg-no-repeat flex items-center justify-center bg-gray-500">
        <div className="absolute top-[5%] left-[5%] w-[20%] h-10">
          <Logo />
        </div>
      </div>
      <div className="bottom h-[25%] w-full bg-white flex justify-center items-center relative pt-6">
        <h1 className='absolute left-[5%] top-[5%] text-black font-bold text-[1.5rem]'>
          Get started with Uber
        </h1>
        <Link to='/userLogin' className="continue bg-black w-[30vh] h-[35%] text-white rounded-md relative flex items-center justify-center">
          Continue
          <FaAngleRight className='absolute right-[5%] top-[50%] -translate-y-1/2 text-white' />
        </Link>
      </div>
    </div>
  )
}

export default Start
