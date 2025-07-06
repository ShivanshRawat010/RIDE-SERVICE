const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true 
  },
  captain: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Captain' 
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: { 
    type: Number, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  fare: { 
    type: Number, 
    required: true 
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp:{
    type: Number,
    select: false
  }
});

module.exports = mongoose.model('ride', rideSchema)