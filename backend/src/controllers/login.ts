import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import Cyclist from "../models/cyclist";
import config from "../utils/config";
import { authenticateToken, withUser } from "../utils/middleware";

const router = express.Router();

router.post("/", async (request, response) => {
  const { rut, password } = request.body;

  if (!rut || !password) {
    return response.status(400).json({ error: "Nombre y contraseña son requeridos" });
  }

  const cyclist = await Cyclist.findOne({ rut }).populate("rolId");

  
  if (!cyclist) {
    return response.status(401).json({ error: "invalid rut or password" });
  }

  const passwordCorrect = await bcrypt.compare(password, cyclist.password);

  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid rut or password" });
  }

  const csrf = crypto.randomUUID();

  const userForToken = {
    id: cyclist._id,
    rut: cyclist.rut,
    rolId: cyclist.rolId._id.toString(), 
    csrf: crypto.randomUUID()
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: 60 * 60, // 1 hora
  });

  response.setHeader("X-CSRF-Token", csrf);

  response.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response.status(200).json({
    name: cyclist.name,
    rut: cyclist.rut,
    rolId: cyclist.rolId._id,
    id: cyclist.id,
  });
});

router.get("/me", authenticateToken, async (request, response, next) => {
  const body = request.body;
  const cyclist = await Cyclist.findById(request.userId);
  response.status(200).json(cyclist);
});

router.post("/logout", (request, response) => {
  response.clearCookie("token");
  response.status(200).send({
    message: "Logged out successfully"
  });
});

export default router;