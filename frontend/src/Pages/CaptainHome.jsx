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
  }, [captain, socket]);

  return (
    <div>
      Captain Home
    </div>
  )
}

export default CaptainHome