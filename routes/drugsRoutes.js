const express = require('express');
const { searchDrugsByID, searchDrugsByName, getDispatchableStock,getAllDrugs } = require('../controllers/drugsController');
const  authorize  = require('../middleware/authMiddleware');  // JWT Middleware

const router = express.Router();
router.get('/',getAllDrugs);
router.get('/searchDrugsByID/:id', authorize, searchDrugsByID);
router.get('/searchDrugsByName/:name', authorize, searchDrugsByName);
router.post('/checkDispatchableStock', authorize, getDispatchableStock);

module.exports = router;
