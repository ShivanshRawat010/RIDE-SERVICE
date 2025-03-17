const captainModel  = require('../models/captain.model')
const captainService = require('../services/captain.service')
const blacklistedTokenModel = require('../models/blacklistedTokens.model')
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

module.exports.loginCaptain = async function(req,res,next){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  const {email, password} = req.body

  const captain = await captainModel.findOne({email}).select('+password')

  if(!captain){
    return res.status(401).json({message: 'Invalid credentials'})
  }

  const isMatch = await captain.comparePasswords(password)

  if(!isMatch){
    return res.status(401).json({message: 'Invalid credentials'})
  }

  const token = captain.generateAuthToken()

  res.cookie('token', token)

  res.status(200).json({token, captain})
}

module.exports.getCaptainProfile = async function(req,res,next){
  res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async function(req,res,next){

  token = req.cookies.token
  await blacklistedTokenModel.create({token: req.cookies.token})

  res.clearCookie('token')
  res.status(200).json({message: 'Logged out'})
}