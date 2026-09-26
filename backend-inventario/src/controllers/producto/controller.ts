import { type Request, type Response } from "express";
import { prisma } from "../../database/prisma.js";

// 1. Obtener todos los productos
export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// 2. Crear un nuevo producto
export const crearProducto = async (req: Request, res: Response) => {
  const { nombre, precio, categoria, fotoBase64 } = req.body;

  if (!nombre || precio === undefined || !categoria) {
    return res.status(400).json({ error: "Nombre, precio y categoría son obligatorios" });
  }

  try {
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        precio: parseFloat(precio),
        categoria,
        fotoBase64: fotoBase64 ?? null,
      },
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// 3. Actualizar un producto existente
export const actualizarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, precio, categoria, fotoBase64 } = req.body;

  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        ...(nombre !== undefined && { nombre }),
        ...(precio !== undefined && { precio: parseFloat(precio) }),
        ...(categoria !== undefined && { categoria }),
        ...(fotoBase64 !== undefined && { fotoBase64 }),
      },
    });
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// 4. Eliminar un producto
export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.producto.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ mensaje: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};