import bcrypt from "bcrypt";
import express from "express";
import User from "../models/cyclist";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({})
    .populate("", { content: 1 })
    .populate("", { content: 1 });
  res.json(users);
});

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;
 
  if (!username || !email || !password) {
    return response.status(400).json({ error: "username, password son requeridos" });
  }

 

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default router;