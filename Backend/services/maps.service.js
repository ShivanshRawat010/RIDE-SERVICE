const axios = require('axios');
const captainModel = require('../models/captain.model');


const getCoordinatesService = async (address) => {

  try {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
      params: {
        text: address,
        apiKey : process.env.GEOAPIFY_API_KEY,
        format: 'json'
      }
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch coordinates');
    }
    const data = response.data;

    if (!data.results?.length) {
      throw new Error("No coordinates found");
    }

    const properties = data.results[0];
    return {
      latitude: properties.lat,
      longitude: properties.lon
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
}

const getDistanceTimeService = async (origin, destination) => {
  
  try {
    const [originCoordinates, destinationCoordinates] = await Promise.all([
      getCoordinatesService(origin),
      getCoordinatesService(destination)
    ]);
    
    const waypoints = `${originCoordinates.latitude},${originCoordinates.longitude}|${destinationCoordinates.latitude},${destinationCoordinates.longitude}`

    const response = await axios.get(`https://api.geoapify.com/v1/routing`, {
        params : {
          apiKey: process.env.GEOAPIFY_API_KEY,
          waypoints: waypoints,
          mode: 'drive',
          units: 'metric',
          format: 'json'
        }
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to fetch route details.');
    }

    const data = response.data

    if (!data.results?.length) {
      throw new Error("No route found");
    }

    return {
      distance: data.results[0].distance,
      duration: data.results[0].time
    }

  } catch (error) {
    console.error('Error fetching distance and time:', error);
    throw error;
  }
}

const getSuggestedPlacesService = async (address) => {
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          text: address,
          apiKey: process.env.GEOAPIFY_API_KEY,
          limit: 5,
          format: 'json'
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch coordinates');
    }

    const data = response.data;

    if (!data.results?.length) {
      throw new Error("No suggested places found");
    }
    return data.results;

  } catch (error) {
    console.error("Error fetching suggested places:", error);
    throw error;
  }
};

const getCaptainsWithinRadiusService = async (latitude, longitude, radius) => {
  const earthRadiusInKilometers = 6378;
  const radiusInKilometers = radius;
  const radiusInRadians = radiusInKilometers / earthRadiusInKilometers;

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[latitude, longitude], radiusInRadians]
      }
    }
  });

  return captains;
}

module.exports = {
  getCoordinatesService,
  getDistanceTimeService,
  getSuggestedPlacesService,
  getCaptainsWithinRadiusService
}