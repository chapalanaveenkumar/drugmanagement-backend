const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: String,
    medicalComposition: String,
    manufacturedDate: Date,
    expiryDate: Date,
    unitsInPackage: Number,
    costPerPackage: Number,
    locations: [{ location: String, availableStock: Number }]
});

module.exports = mongoose.model('Drug', drugSchema);
