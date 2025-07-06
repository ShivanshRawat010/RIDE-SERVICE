const axios = require('axios');

module.exports.getCoordinatesService = async (address) => {

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API
      }
    });
    const data = response.data;
    if (data.status !== 'OK') {
      throw new Error('Failed to fetch coordinates');
    }
    const coordinates = data.results[0].geometry.location;
    return {
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
}

module.exports.getDistancecTimeService = async (origin, destination) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
      params: {
        origins: origin,
        destinations: destination,
        key: process.env.GOOGLE_MAPS_API
      }
    });
    const data = response.data;
    if (data.status !== 'OK') {
      throw new Error('Failed to fetch distance and time');
    }
    const element = data.rows[0].elements[0];
    if (element.status !== 'OK') {
      throw new Error('Failed to fetch distance and time');
    }
    return {
      distance: element.distance.value,
      duration: element.duration.value
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error);
    throw error;
  }
}

module.exports.getSuggestedPlacesService = async (address) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: address,
        key: process.env.GOOGLE_MAPS_API
      }
    });
    const data = response.data;
    if (data.status !== 'OK') {
      throw new Error('Failed to fetch suggested places');
    }
    return data.predictions;
  } catch (error) {
    console.error('Error fetching suggested places:', error);
    throw error;
  }
}