const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes/reviewRoutes');
const businessRoutes = require('./routes/businessRoutes/businessRoutes');
const authRoutes = require('./routes/authRoutes/authRoutes');


const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
