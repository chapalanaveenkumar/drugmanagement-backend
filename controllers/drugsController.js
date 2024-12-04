const Drug = require('../models/drugModel');

// Search drug by ID
const searchDrugsByID = async (req, res) => {
    try {
        const drug = await Drug.findById(req.params.id);
        if (!drug) return res.status(404).send("Drug not found");
        res.json(drug);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Search drug by Name
const searchDrugsByName = async (req, res) => {
    try {
        const drug = await Drug.findOne({ name: req.params.name });
        if (!drug) return res.status(404).send("Drug not found");
        res.json(drug);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get Dispatchable Stock by Location
const getDispatchableStock = async (req, res) => {
    const { drugId, location } = req.body;
    try {
        const drug = await Drug.findById(drugId);
        if (!drug) return res.status(404).send("Drug not found");

        const stock = drug.locations.find(loc => loc.location === location);
        if (!stock) return res.status(404).send("Location not found");

        res.json({ drugId, name: drug.name, expiryDate: drug.expiryDate, availableStock: stock.availableStock });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all drugs
const getAllDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find();  // Retrieves all drugs
        res.json(drugs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getDispatchableStock,
    searchDrugsByName,
    searchDrugsByID,
    getAllDrugs  // Added getAllDrugs to the exports
};
