const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getCoordinatesService(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
