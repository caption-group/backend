const mongoose = require('mongoose');

const TrabajoSchema = new mongoose.Schema({
    titulo: String,
    operador: String,
    estado: String,
    fecha: Date
});

module.exports = mongoose.model('Trabajo', TrabajoSchema);