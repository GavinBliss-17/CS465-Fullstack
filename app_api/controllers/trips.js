const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async(req, res) => {
    try {
        const trips = await Model.find({}).exec(); // No filter, return all trips
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        console.error('Error fetching trips:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GET: /trips/:tripCode - find a trip by code
const tripsFindByCode = async(req, res) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec(); // Find trip by tripCode
        if (!trip) {
            return res.status(404).json({ message: `Trip with code ${req.params.tripCode} not found` });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        console.error('Error fetching trip by code:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};