const Refill = require('../models/refillModel');

// Get all refills for a member
const getRefills = async (req, res) => {
    const memberId = req.params.memberId; // Extract memberId from request parameters

    try {
        const refills = await Refill.find({ memberId });  // Fetch refills for the member
        res.json(refills);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Create a new refill request
const createRefill = async (req, res) => {
    const { memberId, drugName, quantity } = req.body;
    const date = new Date(); // Current date for the refill request

    // Validate input
    if (!memberId || !drugName || !quantity) {
        return res.status(400).send("All fields are required: memberId, drugName, and quantity");
    }

    try {
        const newRefill = new Refill({ memberId, drugName, quantity, date });
        await newRefill.save();
        res.status(201).json({ status: 'Refill request created successfully', refill: newRefill });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update the refill status (e.g., approve, dispatch, deliver)
const updateRefillStatus = async (req, res) => {
    const { refillId, status } = req.body; // Status can be 'pending', 'approved', 'dispatched', 'delivered'

    // Validate input
    if (!refillId || !status) {
        return res.status(400).send("Both refillId and status are required");
    }

    try {
        const refill = await Refill.findByIdAndUpdate(refillId, { status }, { new: true });
        if (!refill) return res.status(404).send("Refill not found");
        res.json({ status: 'Refill status updated', refill });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getRefills,
    createRefill,
    updateRefillStatus
};
