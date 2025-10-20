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
  const { username, password } = request.body;
 
  if (!username || !password) {
    return response.status(400).json({ error: "username, password son requeridos" });
  }

 

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const cyclist = new Cyclist({
    username,
    passwordHash,
  });

  const savedCyclist = await cyclist.save();

  response.status(201).json(savedCyclist);
});

export default router;