const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle:{
    color:{
      type: String,
      required: true
    },
    plate:{
      type: String,
      required: true
    },
    capacity:{
      type: Number,
      required: true,
      min: 1
    },
    vehicleType:{
      type: String,
      required: true,
      enum: ['car', 'bike', 'auto']
    }
  },
  location: {
    ltd:{
      type: Number,
    },
    lng:{
      type: Number,
    }
  }
});

captainSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
}

captainSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

captainSchema.methods.comparePasswords = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;