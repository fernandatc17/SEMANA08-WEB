import express from "express";
import db from "../models/index.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();
const Detalle = db.detalleordencompra;
const Orden = db.ordencompra;
const Medicamento = db.medicamento;

// GET todos los detalles con datos relacionados (factura + medicamento)
router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await Detalle.findAll({
      include: [
        {
          model: Orden,
          attributes: ["NrofacturaProv"]
        },
        {
          model: Medicamento,
          attributes: ["descripcionMed"]
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
  const data = await Detalle.findByPk(req.params.id);
  data ? res.json(data) : res.status(404).send("No encontrado");
});

// POST crear detalle
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = await Detalle.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT actualizar detalle
router.put("/:id", verifyToken, async (req, res) => {
  const data = await Detalle.findByPk(req.params.id);
  if (data) {
    await data.update(req.body);
    res.json(data);
  } else {
    res.status(404).send("No encontrado");
  }
});

// DELETE eliminar detalle
router.delete("/:id", verifyToken, async (req, res) => {
  const data = await Detalle.findByPk(req.params.id);
  if (data) {
    await data.destroy();
    res.send("Eliminado");
  } else {
    res.status(404).send("No encontrado");
  }
});

export default router;
