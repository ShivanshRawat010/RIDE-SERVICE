const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

function generateOtp(length) {
  length = Math.max(1, Math.min(length, 10));
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}

module.exports.calculateFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const { distance, duration } = await mapService.getDistancecTimeService(pickup, destination);

  const fareRates = {
    car:    { base: 50, perKm: 10, perMin: 2 },
    auto:   { base: 30, perKm: 8,  perMin: 1.5 },
    motorcycle: { base: 20, perKm: 5,  perMin: 1 }
  };

  const distanceInKm = distance / 1000;
  const durationInMin = duration / 60;

  const fares = {};
  for (const [type, rates] of Object.entries(fareRates)) {
    const fare = rates.base + (rates.perKm * distanceInKm) + (rates.perMin * durationInMin);
    fares[type] = Number(fare.toFixed(2));
  }

  return {
    fares: fares,
    distance: Number(distanceInKm.toFixed(2)),
    duration: Number(durationInMin.toFixed(2))
  };
}

module.exports.createRideService = async ({pickup, destination, vehicleType, user}) => {


  if (!pickup || !destination || !vehicleType || !user) {
    throw new Error('Pickup, destination, and vehicle type are required');
  }

  let data = await this.calculateFare(pickup, destination);

  const rideData = {
    user,
    pickup,
    destination,
    fare: data.fares[vehicleType],
    distance: data.distance,
    duration: data.duration,
    otp: generateOtp(4),
  };

  try {
    const ride = new rideModel(rideData);
    return await ride.save();
  } catch (error) {
    throw new Error('Error creating ride: ' + error.message);
  }
}


module.exports.confirmRideService = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error('Ride ID and Captain ID are required');
  }

  try {
    const ride = await rideModel.findById(rideId);
    const updatedRide = await rideModel.findByIdAndUpdate(
      rideId,
      { captain: captainId, status: 'accepted' },
      { new: true }
    ).populate('captain').select('+otp');
    
    return updatedRide;
  } catch (error) {
    throw new Error('Error confirming ride: ' + error.message);
  }
}

module.exports.startRideService = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error('Ride ID and OTP are required');
  }

  try {
    const ride = await rideModel.findById(rideId).select('+otp');
    if (!ride) {
      throw new Error('Ride not found');
    }

    if (ride.otp != otp) {
      throw new Error('Invalid OTP');
    }

    ride.status = 'in_progress';
    return await ride.save();
  } catch (error) {
    throw new Error('Error starting ride: ' + error.message);
  }
}

module.exports.finishRideService = async (rideId) => {
  if (!rideId) {
    throw new Error('Ride ID is required');
  }

  try {
    const ride = await rideModel.findById(rideId);
    if (!ride) {
      throw new Error('Ride not found');
    }

    ride.status = 'completed';
    return await ride.save();
  } catch (error) {
    throw new Error('Error finishing ride: ' + error.message);
  }
}