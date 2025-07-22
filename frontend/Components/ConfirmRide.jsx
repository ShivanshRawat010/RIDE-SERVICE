import React from 'react'
import { useEffect,useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const ConfirmRide = (props) => {
  if (!props.ride) return null; // or show a loading/empty state

  const [visible, setVisible] = useState(props.confirm);

  useEffect(() => {
    gsap.to('.confirm-ride', {
      top: visible?'30%':'100%',
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (!visible) {
          props.setConfirm(false);
          props.setStart(true);
        }
      }
    });
    
  }, [visible]);

  async function handleConfirm() {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`, {
        rideId: props.ride._id,
      },{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if(res.status === 200) {
        setVisible(false);
      }
      
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  }


  return (
    <div className='confirm-ride absolute bg-white top-[100%] left-0 w-full h-[70%] flex flex-col rounded-t-lg'>
      <div className='w-full h-[25vw] bg-yellow-400 flex flex-col justify-center items-center rounded-t-lg border-b-2 font-bold text-[8vw] border-black'>
        {props.ride.user.fullName.firstName} {props.ride.user.fullName.lastName}
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
      <div className='w-full h-[25vw]justify-center flex items-center justify-center border-black p-10 gap-16'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => {
          // setConfirm(true);
          handleConfirm();
        }}>Confirm Ride</button>
        <button className='bg-red-500 text-white px-4 py-2 rounded-lg ml-2' onClick={() => {
          setConfirm(false);
        }}>Cancel Ride</button>
      </div>
    </div>
  )
}

export default ConfirmRide
