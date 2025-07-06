const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

function generateOtp(length) {
  length = Math.max(1, Math.min(length, 10));
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}

async function calculateFare(pickup, destination, vehicleType) {
  if (!pickup || !destination || !vehicleType) {
    throw new Error('Pickup, destination, and vehicle type are required');
  }

  const { distance, duration } = await mapService.getDistancecTimeService(pickup, destination);

  const fareRates = {
    car:    { base: 50, perKm: 10, perMin: 2 },
    auto:   { base: 30, perKm: 8,  perMin: 1.5 },
    motorcycle: { base: 20, perKm: 5,  perMin: 1 }
  };

  const rates = fareRates[vehicleType];
  if (!rates) throw new Error('Invalid vehicle type');

  const distanceInKm = distance / 1000;
  const durationInMin = duration / 60;

  const fare = rates.base + (rates.perKm * distanceInKm) + (rates.perMin * durationInMin);

  return { fare, distance: distanceInKm, duration: durationInMin };
}

module.exports.createRideService = async ({pickup, destination, vehicleType, user}) => {


  if (!pickup || !destination || !vehicleType || !user) {
    throw new Error('Pickup, destination, and vehicle type are required');
  }

  let data = await calculateFare(pickup, destination, vehicleType);

  const rideData = {
    user,
    pickup,
    destination,
    fare: data.fare,
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

