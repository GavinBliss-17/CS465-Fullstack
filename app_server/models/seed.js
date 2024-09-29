// Bring in the DB connection & the trip schema
const mongoose = require('./db'); // Ensure consistent naming
const Trip = require('./travlr');

// Read seed data from the JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        console.log('Existing trips deleted');
        await Trip.insertMany(trips);
        console.log('Trips seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Close the MongoDB connection & exit
seedDB().then(async () => {
    try {
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing the database connection:', error);
        process.exit(1); // Exit with failure code if an error occurs
    }
});