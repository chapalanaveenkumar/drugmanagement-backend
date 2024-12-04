const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    memberId: { type: String, required: true },
    prescriptionId: { type: String, required: true },
    plan: { type: String, enum: ['weekly', 'monthly', 'quarterly'], required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
