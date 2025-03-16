const captainModel  = require('../models/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')


module.exports.registerCaptain = async function(req,res,next){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {fullName, email, password, vehicle} = req.body

  const existingCaptain = await captainModel.findOne({email})

  if(existingCaptain){
    return res.status(400).json({message: 'Captain already exists'})
  }

  const hashedPassword = await captainModel.hashPassword(password)

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    vehicleType: vehicle.vehicleType,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity
  })

  const token = captain.generateAuthToken();

  res.cookie('token', token)

  res.status(201).json({token, captain})
}