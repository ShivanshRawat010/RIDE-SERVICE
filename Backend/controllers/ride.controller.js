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

    const captains = await mapService.getCaptainsWithinRadiusService(coordinates.latitude, coordinates.longitude , 100);

    ride.otp = '';

    await ride.populate('user')

    captains.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        data: ride,
        event: 'message'
      });
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

    const ride = await rideService.confirmRideService(rideId, req.captain._id);

    const user = await userModel.findById(ride.user);

    sendMessageToSocketId(user.socketId, {data: ride, event: 'message'});

    ride.otp = undefined;
    
    return res.status(200).json({message: "Ride confirmed successfully", ride});
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId, otp } = req.body;

    const ride = await rideService.startRideService(rideId, otp, req.captain._id);

    const user = await userModel.findById(ride.user);

    sendMessageToSocketId(user.socketId, {data: ride, event: 'ride-started'});

    return res.status(200).json({message: "Ride started successfully", ride});
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}

module.exports.finishRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.body;

    const ride = await rideService.finishRideService(rideId, req.captain._id);

    const user = await userModel.findById(ride.user);

    sendMessageToSocketId(user.socketId, {data: ride, event: 'ride-finished'});

    return res.status(200).json({message: "Ride finished successfully"});
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}