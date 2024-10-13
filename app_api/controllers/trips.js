const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
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
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ 'code': req.params.tripCode }).exec();
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

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await newTrip.save();
        console.log('Trip added:', savedTrip);

        return res.status(201).json(savedTrip);
    } catch (err) {
        console.error('Error adding trip:', err);
        return res.status(400).json({ message: 'Error adding trip', error: err });
    }
};
// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {

    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                .status(404)
                .json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }

        // Uncomment the following line to show results of operation on the console
        // console.log(q);
};

// Export all controllers
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};