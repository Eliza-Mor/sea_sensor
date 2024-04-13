const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http); // Integrar socket.io con el servidor

app.use(cors());

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

const updateSensorData = (newData) => {
    io.emit('sensorDataUpdate', newData); // Emitir actualizaciones a todos los clientes conectados
};

// Simular actualizaciones periódicas (reemplazar con la lógica real de Arduino)
setInterval(async () => {
    try {
        const newData = { pH: Math.random() * 14, temperature: Math.random() * 100 };
        // Guardar los nuevos datos en la base de datos
        await Sensor.updateOne({}, newData); // Aquí debes implementar la lógica real para actualizar la base de datos
        updateSensorData(newData); // Emitir los nuevos datos a través de Socket.IO
    } catch (error) {
        console.error('Error al actualizar los datos del sensor:', error);
    }
}, 3000); // Intervalo de actualización (cada 5 segundos)


// Configurar socket.io para escuchar conexiones
io.on('connection', (socket) => {
    console.log('Cliente conectado');
});

// Conexión HTTP del servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor de API RESTful y Socket.IO en ejecución en http://localhost:${PORT}`);
})