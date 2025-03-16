const express = require('express')
const captainController = require('../controllers/captain.controller.js')
const {body} = require('express-validator')
// const auth = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/register', [
  body('email').isEmail(),
  body('vehicle.capacity').isInt({min: 1}),
  body('vehicle.vehicleType').isIn(['car', 'bike', 'auto'])
], captainController.registerCaptain)

module.exports = router