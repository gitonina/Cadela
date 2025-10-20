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

   const existing = await Cyclist.findOne({ $or: [{ rut }, { n_dorsal }, { name }] });
    if (existing) {
      return response.status(400).json({ error: "Rut, nombre o número de dorsal ya registrados" });
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