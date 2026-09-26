import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Montar el router
app.use("/productos", productosRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});