const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexión a la base de datos MongoDB Atlas
const mongoUri = 'mongodb+srv://admin:2822004@ioty.ikxu0cy.mongodb.net/iot';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Verificar la conexión a MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión establecida correctamente con MongoDB Atlas');
});

// Definir un esquema y un modelo para la colección 'sensores'
const sensorSchema = new mongoose.Schema({
    pH: Number,
    temperature: Number
}, { collection: 'sensores' }); // Especificar el nombre de la colección aquí

const Sensor = mongoose.model('Sensor', sensorSchema);

// Ruta para obtener datos de sensores
app.get('/sensores', async (req, res) => {
    try {
        const sensores = await Sensor.find({}, 'pH temperature');
        res.json(sensores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos de sensores.' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Utilizar el puerto definido por el entorno o 3000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor de API RESTful en ejecución en http://localhost:${PORT}`);
});
