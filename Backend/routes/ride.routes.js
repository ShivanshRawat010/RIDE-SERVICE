const rideController = require('../controllers/ride.controller');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const { body } = require('express-validator');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').notEmpty().withMessage('Pickup location is required'),
  body('destination').notEmpty().withMessage('Destination location is required'),
  body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
  rideController.createRide
);

module.exports = router;