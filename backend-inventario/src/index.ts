import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

const app = express();
const PORT = 3000;

// Habilitar CORS para permitir peticiones desde React Native / móvil
app.use(cors());

// Middleware para JSON con límite ampliado para Base64 (requerimiento del taller)
app.use(express.json({ limit: "10mb" }));

// Montar las rutas en /productos
app.use("/productos", productosRoutes);

// Escuchar en 0.0.0.0 para aceptar conexiones en la red local
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
  console.log(`Rutas disponibles en /productos`);
});