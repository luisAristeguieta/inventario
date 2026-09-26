import { Router } from "express";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto/controller.js";

const router = Router();

// Importante: aquí va "/" porque en index.ts ya se monta con app.use("/productos", ...)
router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;