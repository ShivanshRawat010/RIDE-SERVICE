const captainModel = require('../models/captain.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.createCaptain = async function({ firstName, lastName, email, password , plate, capacity, color, vehicleType }){

  if(!firstName || !email || !password || !plate || !capacity || !color || !vehicleType){
    throw new Error('Missing required fields')
  }

  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password,
    vehicle: {
      plate,
      capacity,
      color,
      vehicleType
    }
  });

  return captain;
}