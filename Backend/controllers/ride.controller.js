const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rideData = req.body;
    const ride = await rideService.createRideService({...rideData , user: req.user.id });

    console.log(`Ride created with ID: ${ride.pickup}`);

    const coordinates = await mapService.getCoordinatesService(ride.pickup);

    console.log(`Coordinates for pickup: ${coordinates.latitude}, ${coordinates.longitude}`);

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