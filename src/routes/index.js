const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes/userRoutes');
const reviewRoutes = require('./reviewRoutes/reviewRoutes');
const businessRoutes = require('./businessRoutes/businessRoutes');
const authRoutes = require('./authRoutes/authRoutes');
const rewardRoutes = require('./rewardRoutes/rewardRouter');
const auxiliarRoutes  = require('./AuxliaryRoutes/AuxiliarRoutesRouter');

// Configuración de rutas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/business', businessRoutes);
router.use('/reward', rewardRoutes);
router.use('/auxiliars', auxiliarRoutes);


module.exports = router;