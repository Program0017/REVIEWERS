// Importar dependencias y configurar dotenv
const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const routes = require('./routes');
// Importar servicios y rutas
const rewardService = require('./services/rewardServices/rewardService');

// Crear instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use('/api',routes)


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
