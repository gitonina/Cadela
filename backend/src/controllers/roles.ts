import express from "express";
import { Role } from "../models/roles";
import { authenticateToken } from "../utils/middleware";

const router = express.Router();

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    res.json(role);
  } catch (e) {
    res.status(500).json({ error: "Error buscando el rol" });
  }
});

export default router;
