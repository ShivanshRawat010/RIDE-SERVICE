const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  fullName : {
    firstName : {
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
    socketId : {
      type: String 
    }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  return token;
}

userSchema.methods.comparePasswords = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;