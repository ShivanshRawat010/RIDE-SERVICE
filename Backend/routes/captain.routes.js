const express = require('express')
const captainController = require('../controllers/captain.controller.js')
const {body} = require('express-validator')
const {authCaptain} = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/register', [
  body('email').isEmail(),
  body('vehicle.capacity').isInt({min: 1}),
  body('vehicle.vehicleType').isIn(['car', 'bike', 'auto'])
], captainController.registerCaptain)

router.post('/login', [body('email').isEmail().withMessage('Invalid Email')] ,captainController.loginCaptain)

router.get('/profile', authCaptain, captainController.getCaptainProfile)

router.get('/logout', authCaptain, captainController.logoutCaptain)

module.exports = router