// models/sensor.js
const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    ph: Number,
    temperature: Number
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
