import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext';
import ConfirmRide from '../../Components/ConfirmRide';
import gsap from 'gsap';
import StartRide from '../../Components/StartRide';
import FinishRide from '../../Components/FinishRide';
import LiveTracking from '../../Components/LiveTracking';


const CaptainHome = () => {

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [ride,setRide] = useState();
  const [confirm, setConfirm] = useState(false);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);

  // useEffect(() => {
  //   gsap.to('.confirm-ride', {
  //     top: confirm?'30%':'100%',
  //     duration: 0.5,
  //     ease: 'power2.out',
  //   });
    
  // }, [confirm]);

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    const intervalId = setInterval(() => {
      if (navigator.geolocation && captain?._id) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            }
          });
        });
      }
    }, 10000);

    socket.on('message', (message) => {
      setRide(message);
      setConfirm(true);
    });


  }, [ride]);

  // useEffect(() => {
  //   console.log('Start Ride:', start);
  //   console.log('Ride:', ride);
  // },[start])

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div
        className={`bg-cover w-full absolute top-0 left-0 ${!finish ? 'h-full' : 'h-[90%]'
          }`}
      >
        <div className='w-full h-full'>
          <LiveTracking />
        </div>
      </div>
      {
        ride && <ConfirmRide ride={ride} confirm={confirm} setConfirm={setConfirm} setRide={setRide} setStart={setStart}/>
      }

      {/* <div className='confirm-ride absolute bg-white top-[100%] left-0 w-full h-[70%] flex flex-col rounded-t-lg'>
        <div className='w-full h-[25vw] bg-yellow-400 flex flex-col justify-center items-center rounded-t-lg border-b-2 font-bold text-[8vw] border-black'>
          {ride?.user.fullName.firstName} {ride?.user.fullName.lastName}
        </div>
        <div className='w-full h-[25vw] px-4 flex justify-between items-center border-b-2 border-black'>
          <h3 className='text-[5vw] font-bold'>Pickup :</h3>
          <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden '>{ride?.pickup}</h3>
        </div>
        <div className='w-full h-[25vw] px-4 flex justify-between items-center border-b-2 border-black'>
          <h3 className='text-[5vw] font-bold'>Drop :</h3>
          <h3 className='max-w-[40%] max-h-[55%] whitespace-normal overflow-hidden '>{ride?.destination}</h3>
        </div>
        <div className='w-full pt-6 text-[8vw] font-bold flex justify-center items-center'>
          ₹{ride?.fare}
        </div>
        <div className='w-full h-[25vw]justify-center flex items-center justify-center border-black p-10 gap-16'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={() => {
            setConfirm(false);
            setRide(null);
          }}>Confirm Ride</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg ml-2' onClick={() => {
            setConfirm(false);
            setRide(null);
          }}>Cancel Ride</button>
        </div>
      </div> */}

      {
        start && <StartRide ride={ride} start={start} setStart={setStart} setRide={setRide} setFinish={setFinish}/>
      }

      {
        finish && <FinishRide finish={finish} setFinish={setFinish} ride={ride} setRide={setRide}/>
      }

    </div>
  )
}

export default CaptainHome