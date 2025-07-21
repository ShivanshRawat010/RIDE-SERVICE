import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext';
import ConfirmRide from '../../Components/ConfirmRide';


const CaptainHome = () => {

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [ride,setRide] = useState();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    const intervalId = setInterval(() => {
      if (navigator.geolocation && captain?._id) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position.coords.latitude, position.coords.longitude);
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

  return (
    <div className='relative w-full h-screen bg-gray-900 overflow-hidden'>
      {
        ride && <ConfirmRide ride={ride} confirm={confirm} setConfirm={setConfirm} setRide={setRide}/>
      }
      
    </div>
  )
}

export default CaptainHome