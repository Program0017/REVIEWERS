// Importar dependencias y configurar dotenv
const express = require('express');
require('dotenv').config();
const cron = require('node-cron');

// Importar servicios y rutas
const rewardService = require('./services/rewardServices/rewardService');
const userRoutes = require('./routes/userRoutes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes/reviewRoutes');
const businessRoutes = require('./routes/businessRoutes/businessRoutes');
const authRoutes = require('./routes/authRoutes/authRoutes');
const rewardRoutes = require('./routes/rewardRoutes/rewardRouter');

// Crear instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de rutas
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reward', rewardRoutes);

// Configuración de cron job para caducar recompensas todos los días a la 12:00 AM
cron.schedule('0 0 * * *', async () => {
    try {
        const expiredCount = await rewardService.expireRewards();
        console.log(`Se actualizaron ${expiredCount} recompensas expiradas.`);
    } catch (error) {
        console.error('Error al caducar recompensas:', error);
    }
});

// Iniciar servidor en el puerto especificado en .env o en el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
