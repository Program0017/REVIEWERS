const express = require('express');
const router = express.Router();
const createBusiness = require('../../controllers/businessControllers/CreateController');
const updateBusiness = require('../../controllers/businessControllers/UpdateController');
const deactiveBusiness = require('../../controllers/businessControllers/DeactivateController');
const listOrSearchBusiness = require('../../controllers/businessControllers/ReadBusiness');
const searchBusiness = require('../../controllers/businessControllers/SearchBusiness');
const assignTag = require('../../controllers/businessControllers/assignBusinessTag');
const businessDataValidationMiddleware  = require('../../middleware/businessValidationMiddleware');
const authMiddleware = require('../../middleware/authMiddleware');



// Business Routes
router.post('/business', businessDataValidationMiddleware, authMiddleware, createBusiness.createBusiness);
router.put('/:businessId',businessDataValidationMiddleware,  authMiddleware, updateBusiness.editBusiness);
router.put('/toggle-status/:businessId', authMiddleware, deactiveBusiness.toggleBusinessActiveStatus);
router.get('/bigsearch', authMiddleware, listOrSearchBusiness.listOrSearchBusinesses);
router.get('/search', authMiddleware, searchBusiness.searchBusiness);
router.post('/assign-tag', authMiddleware, assignTag.assignTag);


module.exports = router;
