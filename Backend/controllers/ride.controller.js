const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const userModel = require('../models/user.model');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rideData = req.body;
    const ride = await rideService.createRideService({...rideData , user: req.user.id });

    const coordinates = await mapService.getCoordinatesService(ride.pickup);

    console.log(coordinates);

    const captains = await mapService.getCaptainsWithinRadiusService(coordinates.latitude, coordinates.longitude , 10);

    ride.otp = '';

    await ride.populate('user')

    captains.map(captain => {
      sendMessageToSocketId(captain.socketId, ride);
    });
    
    res.status(201).json(ride);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.getFare = async (req, res) => {
  const { pickup, destination } = req.query;

  if (!pickup || !destination) {
    return res.status(400).json({ error: 'Pickup, destination are required' });
  }

  try {
    const data = await rideService.calculateFare(pickup, destination);
    return res.status(200).json(data.fares);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.body;
    // console.log('Ride:', rideId, 'Captain:', req.captain._id);

    const ride = await rideService.confirmRideService(rideId, req.captain._id);

    const user = await userModel.findById(ride.user);

    console.log(user.socketId);

    sendMessageToSocketId(user.socketId, ride);
    
    return res.status(200).json({message: "Ride confirmed successfully", ride});
  } catch (error) {
    console.error('big mistake');
    return res.status(500).json({ error: "big mistake" });
  }
}