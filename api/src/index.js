// app.js
const express = require('express');
const mongoose = require('mongoose');
const sensorRoutes = require('./routes/sensorRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a la base de datos MongoDB'))
    .catch(err => console.error('Error de conexión a la base de datos MongoDB:', err.message));

app.use(express.json());
app.use(sensorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
