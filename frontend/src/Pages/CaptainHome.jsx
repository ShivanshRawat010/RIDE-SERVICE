import React from 'react'
import { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {SocketContext} from '../context/SocketContext';


const CaptainHome = () => {

  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    // console.log('Captain data:', captain);
    socket.emit('join', { userId: captain._id, userType: 'captain' });

    

    const intervalId = setInterval(() => {
      if (navigator.geolocation && captain?._id) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(`Updating location for captain: ${captain._id}, Location: ${position.coords.latitude}, ${position.coords.longitude}`);
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

  }, [captain, socket]);

  return (
    <div>
      Captain Home
    </div>
  )
}

export default CaptainHome