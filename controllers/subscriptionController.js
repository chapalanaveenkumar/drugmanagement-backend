const Subscription = require('../models/subscriptionModel');

// Subscribe to Mail-Order Pharmacy
const subscribe = async (req, res) => {
    const { memberId, prescriptionId, plan, quantity } = req.body;

    // Validate input
    if (!memberId || !prescriptionId || !plan || !quantity) {
        return res.status(400).send("All fields are required: memberId, prescriptionId, plan, and quantity");
    }

    try {
        const newSubscription = new Subscription({ memberId, prescriptionId, plan, quantity });
        await newSubscription.save();
        res.status(201).json({ status: 'Subscribed successfully', subscription: newSubscription });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Unsubscribe from Mail-Order Pharmacy
const unsubscribe = async (req, res) => {
    const { memberId } = req.body;
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { memberId, status: 'active' },
            { status: 'inactive' },
            { new: true }
        );
        if (!subscription) return res.status(404).send("Subscription not found");
        res.json({ status: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();  // Retrieves all subscriptions
        res.json(subscriptions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { 
    subscribe, 
    unsubscribe, 
    getAllSubscriptions 
};
