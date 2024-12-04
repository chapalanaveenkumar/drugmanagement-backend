const express = require('express');
const { subscribe, unsubscribe,getAllSubscriptions } = require('../controllers/subscriptionController');
const  authorize  = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/',getAllSubscriptions);
router.post('/subscribe',  subscribe);
router.post('/unsubscribe', authorize, unsubscribe);

module.exports = router;
