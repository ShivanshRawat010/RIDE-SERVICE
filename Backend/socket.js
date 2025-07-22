const socket = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initSocket(server) {
  io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', async(data)=>{
      const {userId, userType} = data;

      console.log(`User joined: ${userId}, Type: ${userType}`);

      if(userType == 'user'){
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if(userType == 'captain'){
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('update-location-captain', async (data)=>{
      const { captainId, location } = data;

      if(!captainId || !location || !location.ltd || !location.lng) {
        return socket.emit('error', 'Invalid data provided');
      }
      

      await captainModel.findByIdAndUpdate(captainId, { location: { ltd: location.ltd, lng: location.lng } });
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    console.error('Socket.io is not initialized');
  }
}

module.exports = {
  initSocket,
  sendMessageToSocketId
};