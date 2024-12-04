const mongoose = require('mongoose');

const refillSchema = new mongoose.Schema({
    memberId: { type: String, required: true }, // Link to the user (member) requesting the refill
    drugName: { type: String, required: true }, // Name of the drug being refilled
    date: { type: Date, required: true }, // Refill request date
    status: { type: String, enum: ['pending', 'approved', 'dispatched', 'delivered'], default: 'pending' }, // Current status of the refill
    quantity: { type: Number, required: true }, // Quantity of the drug to be refilled
}, { timestamps: true });

module.exports = mongoose.model('Refill', refillSchema);
