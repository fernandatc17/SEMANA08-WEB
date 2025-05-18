import express from "express";
import db from "../models/index.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();
const OrdenCompra = db.ordencompra;
const Laboratorio = db.laboratorio;

// GET todas las órdenes con razón social del laboratorio
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await OrdenCompra.findAll({
      include: [
        {
          model: Laboratorio,
          attributes: ["razonSocial"]
        }
      ]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET por ID
router.get("/:id", verifyToken, async (req, res) => {
  const data = await OrdenCompra.findByPk(req.params.id);
  data ? res.json(data) : res.status(404).send("No encontrado");
});

// POST crear orden
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = await OrdenCompra.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT actualizar orden
router.put("/:id", verifyToken, async (req, res) => {
  const data = await OrdenCompra.findByPk(req.params.id);
  if (data) {
    await data.update(req.body);
    res.json(data);
  } else {
    res.status(404).send("No encontrado");
  }
});

// DELETE eliminar orden
router.delete("/:id", verifyToken, async (req, res) => {
  const data = await OrdenCompra.findByPk(req.params.id);
  if (data) {
    await data.destroy();
    res.send("Eliminado");
  } else {
    res.status(404).send("No encontrado");
  }
});

export default router;
