import express from "express";
import db from "../models/index.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();
const Laboratorio = db.laboratorio;

// GET all
router.get("/", verifyToken, async (req, res) => {
  const data = await Laboratorio.findAll();
  res.json(data);
});

// GET by ID
router.get("/:id", verifyToken, async (req, res) => {
  const data = await Laboratorio.findByPk(req.params.id);
  data ? res.json(data) : res.status(404).send("No encontrado");
});

// POST
router.post("/", verifyToken, async (req, res) => {
  const data = await Laboratorio.create(req.body);
  res.status(201).json(data);
});

// PUT
router.put("/:id", verifyToken, async (req, res) => {
  const data = await Laboratorio.findByPk(req.params.id);
  if (data) {
    await data.update(req.body);
    res.json(data);
  } else {
    res.status(404).send("No encontrado");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  const data = await Laboratorio.findByPk(req.params.id);
  data ? (await data.destroy(), res.send("Eliminado")) : res.status(404).send("No encontrado");
});

export default router;
