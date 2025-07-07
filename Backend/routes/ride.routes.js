const rideController = require('../controllers/ride.controller');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const { body,query } = require('express-validator');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').notEmpty().withMessage('Pickup location is required'),
  body('destination').notEmpty().withMessage('Destination location is required'),
  body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
  rideController.createRide
);

router.get('/get-fare', authMiddleware.authUser, query('pickup').notEmpty(), query('destination').notEmpty(),rideController.getFare);

module.exports = router;