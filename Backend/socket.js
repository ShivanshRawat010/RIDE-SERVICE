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
    console.log('A user connected:', socket.id);

    socket.on('join', async(data)=>{
      const {userId, userType} = data;

      console.log(`User joined: ${userId}, Type: ${userType}`);

      if(userType == 'user'){
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if(userType == 'captain'){
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    // Add more event listeners as needed
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit('message', message);
  } else {
    console.error('Socket.io is not initialized');
  }
}

module.exports = {
  initSocket,
  sendMessageToSocketId
};