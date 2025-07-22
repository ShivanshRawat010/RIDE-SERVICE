import React from 'react'
import { useEffect,useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const AcceptRide = (props) => {

  if (!props.ride) return null;

  const [visible, setVisible] = useState(props.confirm);
  useEffect(() => {
    gsap.to('.accept-ride', {
      top: visible?'30%':'100%',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (!visible) {
          props.setConfirm(false);
        }
      }
    });
    
  }, [visible]);


  return (
    <div className='accept-ride z-[500] absolute bg-white top-[100%] left-0 w-full h-[70%] flex flex-col rounded-t-lg'>
      <div className='w-full  bg-yellow-400 flex px-3 pt-4 pb-8 justify-between items-start rounded-t-lg border-b-2 font-bold border-black'>
        <h3 className='text-[6vw]'>
          {props.ride.captain.fullName.firstName} {props.ride.captain.fullName.lastName}
        </h3>
        <div className='flex flex-col items-center'>
          <h3 className='text-[6vw]'>
            {props.ride.captain.vehicle.plate}
          </h3>
          <h3 className='text-[2vw] font-semibold' style={{textTransform: 'capitalize'}}>
            {props.ride.captain.vehicle.vehicleType}
          </h3>
        </div>
      </div>
      <div className='w-full text-[6vw] px-4 font-bold flex justify-between items-center border-b-2 border-black' style={{padding: '1rem'}}>
        <h3>
          OTP: 
        </h3>
        <h3>
          {props.ride.otp}
        </h3>
      </div>
      <div className='w-full h-[25vw] px-4 flex justify-between items-center border-b-2 border-black'>
        <h3 className='text-[5vw] font-bold'>Pickup :</h3>
        <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden '>{props.ride.pickup}</h3>
      </div>
      <div className='w-full h-[25vw] px-4 flex justify-between items-center border-b-2 border-black'>
        <h3 className='text-[5vw] font-bold'>Drop :</h3>
        <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden '>{props.ride.destination}</h3>
      </div>
      <div className='w-full pt-6 text-[8vw] font-bold flex justify-center items-center'>
        ₹{props.ride.fare}
      </div>
      
      
    </div>
  )
}

export default AcceptRide
