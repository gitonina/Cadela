import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import Cyclist from "../models/cyclist";
import config from "../utils/config";
import { withUser } from "../utils/middleware";

const router = express.Router();

router.post("/", async (request, response) => {
  const { name, password } = request.body;
    if (!name || !password) {
    return response.status(400).json({ error: "Nombre y contraseña son requeridos" });
  }
  const cyclist = await Cyclist.findOne({ name });
  if (cyclist) {
    const passwordCorrect = await bcrypt.compare(password, cyclist.password);

    if (!passwordCorrect) {
      response.status(401).json({
        error: "invalid username or password",
      });
    } else {
      const userForToken = {
        id: cyclist._id,
        name: cyclist.name,
        csrf: crypto.randomUUID(),
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      response.setHeader("X-CSRF-Token", userForToken.csrf);
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      response.status(200).send({ username: cyclist.name });
    }
  } else {
    response.status(401).json({
      error: "invalid username or password",
    });
  }
});

router.get("/me", withUser, async (request, response, next) => {
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