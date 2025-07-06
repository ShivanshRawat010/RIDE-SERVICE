const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rideData = req.body;
    const ride = await rideService.createRideService({...rideData , user: req.user.id });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}