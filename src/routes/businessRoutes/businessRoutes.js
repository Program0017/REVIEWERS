const express = require('express');
const router = express.Router();
const createBusiness = require('../../controllers/businessControllers/createController');
const updateBusiness = require('../../controllers/businessControllers/UpdateController');
const deactiveBusiness = require('../../controllers/businessControllers/DeactivateController');
const listOrSearchBusiness = require('../../controllers/businessControllers/ReadBusiness');
const searchBusiness = require('../../controllers/businessControllers/SearchBusiness');
const authMiddleware = require('../../middleware/authMiddleware');

// Business Routes
router.post('/business', authMiddleware, createBusiness.createBusiness);
router.put('/edit', authMiddleware, updateBusiness.editBusiness);
router.put('/toggle-status/:businessId', authMiddleware, deactiveBusiness.toggleBusinessActiveStatus);
router.get('/bigsearch', authMiddleware, listOrSearchBusiness.listOrSearchBusinesses);
router.get('/search', authMiddleware, searchBusiness.searchBusiness);

module.exports = router;
