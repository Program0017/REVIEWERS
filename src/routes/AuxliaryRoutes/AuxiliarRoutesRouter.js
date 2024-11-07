const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

const createActionPoint = require('../../controllers/AuxiliarsControllers/PointsControllers/CreateController');
const getActionPointByPoints = require('../../controllers/AuxiliarsControllers/PointsControllers/ReadAllByPoint');
const getActionPointsById = require('../../controllers/AuxiliarsControllers/PointsControllers/ReadByIdController');
const getAllActionPoints = require('../../controllers/AuxiliarsControllers/PointsControllers/ReadController');
const editActionPoint = require('../../controllers/AuxiliarsControllers/PointsControllers/UpdateController');

const createbusinessCategory = require('../../controllers/AuxiliarsControllers/BusinessCategoryControllers/CreateController');
const getAllbusinessCategorys = require('../../controllers/AuxiliarsControllers/BusinessCategoryControllers/ReadController');
const editbusinessCategory = require('../../controllers/AuxiliarsControllers/BusinessCategoryControllers/UpdateController');

const createRewardCategory = require('../../controllers/AuxiliarsControllers/RewardCategoryControllers/CreateController');
const getAllRewardCategories = require('../../controllers/AuxiliarsControllers/RewardCategoryControllers/ReadController');
const editRewardCategory = require('../../controllers/AuxiliarsControllers/RewardCategoryControllers/UpdateController');

const createUserTags = require('../../controllers/AuxiliarsControllers/UserTagsControllers/CreateController');
const getUserTagsByUserId = require('../../controllers/AuxiliarsControllers/UserTagsControllers/ReadByIdController');
const getAllUserTags = require('../../controllers/AuxiliarsControllers/UserTagsControllers/ReadController');
const editUserTag = require('../../controllers/AuxiliarsControllers/UserTagsControllers/UpdateController');

const createBusinessTags = require('../../controllers/AuxiliarsControllers/BusinessTagsControllers/CreateController');
const getTagsByBusinessId = require('../../controllers/AuxiliarsControllers/BusinessTagsControllers/ReadController');
const getAllBusinessTags = require('../../controllers/AuxiliarsControllers/BusinessTagsControllers/ReadController');
const editBusinessTag = require('../../controllers/AuxiliarsControllers/BusinessTagsControllers/UpdateController');



// Action Point Routes
router.post('/action-point', authMiddleware, createActionPoint.createActionPoint);          // Crear un nuevo punto de acción
router.get('/action-point/points/:points', authMiddleware, getActionPointByPoints.getActionPointByPoints); // Obtener puntos de acción por valor de puntos
router.get('/action-point/:id', authMiddleware, getActionPointsById.getActionPointsById);    // Obtener puntos de acción por ID
router.get('/action-points', authMiddleware, getAllActionPoints.getAllActionPoints);         // Obtener todos los puntos de acción
router.put('/action-point/:id', authMiddleware, editActionPoint.editActionPoint);            // Editar punto de acción por ID

// Business Category Routes
router.post('/business-category', authMiddleware, createbusinessCategory.createbusinessCategory);          // Crear una nueva categoría de negocio
router.get('/business-categories', authMiddleware, getAllbusinessCategorys.getAllbusinessCategorys);       // Obtener todas las categorías de negocio
router.put('/business-category/:id', authMiddleware, editbusinessCategory.editbusinessCategory);           // Editar categoría de negocio por ID

// Reward Category Routes
router.post('/reward-category', authMiddleware, createRewardCategory.CreateRewardCategory);      // Crear una nueva categoría de recompensa
router.get('/reward-categories', authMiddleware, getAllRewardCategories.getAllRewardCategories); // Obtener todas las categorías de recompensa
router.put('/reward-category/:id', authMiddleware, editRewardCategory.editRewardCategory);     // Editar una categoría de recompensa por ID

// User Tag Routes
router.post('/user-tag', authMiddleware, createUserTags.createUserTags);                // Crear un nuevo tag de usuario
router.get('/user-tags/:user_id', authMiddleware, getUserTagsByUserId.getUserTagsByUserId); // Obtener los tags de un usuario específico por user_id
router.get('/user-tags', authMiddleware, getAllUserTags.getAllUserTags);                // Obtener todos los tags de usuarios
router.put('/user-tag/:id', authMiddleware, editUserTag.editTag); 

// Business Tag Routes
router.post('/business-tag', authMiddleware, createBusinessTags.createBusinessTags);               // Crear un nuevo tag de negocio
router.get('/business-tags/:businessId', authMiddleware, getTagsByBusinessId.getAllBusinessTags); // Obtener los tags de un negocio específico por businessId
router.get('/business-tags', authMiddleware, getAllBusinessTags.getAllBusinessTags);               // Obtener todos los tags de negocios
router.put('/business-tag/:id', authMiddleware, editBusinessTag.editTag);     


module.exports = router;
