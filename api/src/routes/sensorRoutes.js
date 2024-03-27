// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor');

// Ruta para obtener todos los sensores
router.get('/sensores', async (req, res) => {
    try {
        const sensores = await Sensor.find();
        res.json(sensores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para crear un nuevo sensor
router.post('/sensores', async (req, res) => {
    const sensor = new Sensor({
        ph: req.body.ph,
        temperature: req.body.temperature
    });

    try {
        const newSensor = await sensor.save();
        res.status(201).json(newSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para obtener un sensor por su ID
router.get('/sensores/:id', getSensor, (req, res) => {
    res.json(res.sensor);
});

// Middleware para buscar un sensor por su ID
async function getSensor(req, res, next) {
    let sensor;
    try {
        sensor = await Sensor.findById(req.params.id);
        if (sensor == null) {
            return res.status(404).json({ message: 'Sensor no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.sensor = sensor;
    next();
}

// Ruta para actualizar un sensor
router.patch('/sensores/:id', getSensor, async (req, res) => {
    if (req.body.ph != null) {
        res.sensor.ph = req.body.ph;
    }
    if (req.body.temperature != null) {
        res.sensor.temperature = req.body.temperature;
    }

    try {
        const updatedSensor = await res.sensor.save();
        res.json(updatedSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para borrar un sensor
router.delete('/sensores/:id', getSensor, async (req, res) => {
    try {
        await res.sensor.remove();
        res.json({ message: 'Sensor eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
