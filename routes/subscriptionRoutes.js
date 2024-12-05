const express = require('express');
const { subscribe, unsubscribe,getAllSubscriptions ,getSubscriptionById} = require('../controllers/subscriptionController');
const  authorize  = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/:memberId',getSubscriptionById);
router.get('/',getAllSubscriptions);
router.post('/subscribe', subscribe);
router.post('/unsubscribe', authorize, unsubscribe);

module.exports = router;
