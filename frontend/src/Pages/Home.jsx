import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='w-full h-screen relative'>
      <div className="top bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Modern_British_LED_Traffic_Light.jpg/440px-Modern_British_LED_Traffic_Light.jpg)] h-[75%] w-full">
        <div className="absolute top-[5%] left-[5%] w-[20%] h-10">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" className='w-full' />
        </div>
      </div>
      <div className="bottom h-[25%] w-full bg-white flex justify-center items-center relative pt-6">
        <h1 className='absolute left-[5%] top-[5%] text-black font-bold text-[6vw]'>
          Get started with Uber
        </h1>
        <Link to='/userLogin' className="continue bg-black w-[70%] h-[35%] text-white rounded-md relative flex items-center justify-center">
          Continue
          <FaAngleRight className='absolute right-[5%] top-[50%] -translate-y-1/2 text-white' />
        </Link>
      </div>
    </div>
  )
}

export default HomePage
