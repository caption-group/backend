require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Modelo
const TrabajoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  estado: String,
});

const Trabajo = mongoose.model("Trabajo", TrabajoSchema);

// Rutas
app.get("/api/trabajos", async (req, res) => {
  try {
    const trabajos = await Trabajo.find();
    res.json(trabajos);
  } catch (err) {
    console.error("Error al obtener trabajos:", err);
    res.status(500).json({ error: "Error al obtener trabajos" });
  }
});

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto", PORT);
});
