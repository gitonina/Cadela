import bcrypt from "bcrypt";
import express from "express";
import Cyclist from "../models/cyclist";

const router = express.Router();

router.get("/", async (req, res) => {
  const cyclists = await Cyclist.find({})
    .populate("", { content: 1 })
    .populate("", { content: 1 });
  res.json(cyclists);
});

router.post("/", async (request, response) => {
const { rut, name, club, n_dorsal, password } = request.body; 
  if (!rut || !name || !club || !n_dorsal || !password) {
    return response.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const existingRut = await Cyclist.findOne({ rut });
  const existingDorsal = await Cyclist.findOne({ n_dorsal });
  if (existingRut) {
    return response.status(400).json({ error: "Rut ya registrado" });
  }
  if (existingDorsal) {
    return response.status(400).json({ error: "Dorsal ya registrado, por favor escoger otro" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const cyclist = new Cyclist({
      rut,
      name,
      club,
      n_dorsal,
      password: passwordHash,
  });

  const savedCyclist = await cyclist.save();

  response.status(201).json(savedCyclist);
});

export default router;