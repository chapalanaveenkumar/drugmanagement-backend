const express = require('express');
const router = express.Router();
const refillController = require('../controllers/refillControllers');

// Route to get all refills for a member
router.get('/refills/:memberId', refillController.getRefills);

// Route to create a new refill request
router.post('/refills', refillController.createRefill);

// Route to update refill status
router.put('/refills/status', refillController.updateRefillStatus);

module.exports = router;
