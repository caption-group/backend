require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexión a MongoDB (solo con la URI, sin useNewUrlParser ni useUnifiedTopology)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('🔗 Conectado a MongoDB Atlas'))
  .catch((error) => console.error('❌ Error conectando a MongoDB:', error));

// Modelo Trabajo (si no lo tenés ya definido)
const trabajoSchema = new mongoose.Schema({
  nombre: String,
  cliente: String,
  tipo: String,
  tarifa: Number,
  operador: String,
  fecha: Date,
});
const Trabajo = mongoose.model('Trabajo', trabajoSchema);

// ENDPOINTS

// GET todos los trabajos
app.get('/api/trabajos', async (req, res) => {
  try {
    const trabajos = await Trabajo.find();
    res.json(trabajos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener trabajos' });
  }
});

// POST crear nuevo trabajo
app.post('/api/trabajos', async (req, res) => {
  try {
    const nuevoTrabajo = new Trabajo(req.body);
    await nuevoTrabajo.save();
    res.status(201).json(nuevoTrabajo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear trabajo' });
  }
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
