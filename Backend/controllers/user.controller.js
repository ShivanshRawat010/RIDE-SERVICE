const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const blacklistedTokenModel = require('../models/blacklistedTokens.model')

module.exports.registerUser = async function(req,res,next){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {fullName, email, password} = req.body

  const existingUser = await userModel.findOne({email})

  if(existingUser){
    return res.status(400).json({message: 'User already exists'})
  }

  const hashedPassword = await userModel.hashPassword(password)

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword
  })

  const token = user.generateAuthToken();

  res.cookie('token', token)

  res.status(201).json({token, user})
}

module.exports.loginUser = async function(req,res,next){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body

  const user = await userModel.findOne({email}).select('+password')
  if(!user){
    return res.status(401).json({message: 'Invalid Email or Password'})
  }
  
  const isMatch = await user.comparePasswords(password)
  if(!isMatch){
    return res.status(401).json({message: 'Invalid Email or Password'})
  }

  const token = user.generateAuthToken();

  res.cookie('token', token)

  res.status(200).json({token, user})
}

module.exports.getUserProfile = async function(req,res,next){
  const user = req.user;
  res.status(200).json(user)
}

module.exports.logoutUser = async function(req,res,next){

  token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
  
  res.clearCookie('token')

  const existingToken = await blacklistedTokenModel.findOne({ token });
  if (!existingToken) {
    await blacklistedTokenModel.create({ token });
  }

  res.status(200).json({message: 'Logged Out'})
}