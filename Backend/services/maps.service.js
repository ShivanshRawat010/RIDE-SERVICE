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