import bcrypt from "bcrypt";
import express from "express";
import Cyclist from "../models/cyclist";
import { Role } from "../models/roles";
const router = express.Router();
import { authenticateToken,requireRole } from "../utils/middleware";
router.get("/", async (req, res) => {
  const cyclists = await Cyclist.find({})
    .populate("", { content: 1 })
    .populate("", { content: 1 });
  res.json(cyclists);
});

router.post("/", async (request, response) => {
  try {
    const { rut, name, club, n_dorsal, password } = request.body;

    if (!rut || !name || !club || !n_dorsal || !password) {
      return response
        .status(400)
        .json({ error: "Todos los campos son requeridos" });
    }

    const cyclistRole = await Role.findOne({ name: "cyclist" });

    if (!cyclistRole) {
      return response
        .status(500)
        .json({ error: "Rol 'cyclist' no encontrado en la base de datos" });
    }

    const existing = await Cyclist.findOne({
      $or: [{ rut }, { n_dorsal }, { name }],
    });

    if (existing) {
      return response
        .status(400)
        .json({ error: "Rut, nombre o número de dorsal ya registrados" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const cyclist = new Cyclist({
      rut,
      name,
      club,
      n_dorsal,
      password: passwordHash,
      rolId: cyclistRole._id,
    });

    const savedCyclist = await cyclist.save();

    return response.status(201).json(savedCyclist);
  } catch (err: any) {
    console.error("Error registrando ciclista:", err);
    return response
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});


export default router;