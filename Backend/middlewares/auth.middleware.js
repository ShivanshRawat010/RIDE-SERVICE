const userModel = require('../models/user.model')
const blacklistedTokenModel = require('../models/blacklistedTokens.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.authUser = async function(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }

  const isBlacklisted = await blacklistedTokenModel.findOne({token})
  
  if(isBlacklisted){
    return res.status(401).json({message: 'Unauthorized'})
  }
    
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await userModel.findById(decoded._id)

    if(!user){
      return res.status(401).json({message: 'Unauthorized'})
    }

    req.user = user;

    return next();
  }
  catch(err){
    res.status(401).json({message: 'Unauthorized'})
  }
}