const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Trabajo = require('./models/Trabajo');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🟢 Conectado a MongoDB'))
    .catch((err) => console.error('🔴 Error conectando a MongoDB', err));

// Ruta de prueba para trabajos
app.get('/api/trabajos', async (req, res) => {
    const trabajos = await Trabajo.find();
    res.json(trabajos);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});