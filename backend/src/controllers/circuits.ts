import express, { NextFunction, Request, Response } from "express";
import { Circuit } from "../models/circuit";
import { authenticateToken,requireRole } from "../utils/middleware";
const router=express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Circuit.find({})
    .then((circuits) => {
      res.json(circuits);
    })
    .catch((error) => next(error));
});

router.post("/",authenticateToken,requireRole(["admin"]), (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.distance || !body.elevationGain) {
    return response.status(400).json({ error: "metrics missing" });
  };

  const circuit = {
    name: body.name,
    distance: body.distance,
    elevationGain: body.elevationGain,
    kml_path: null,
    pathPhoto: null,
  };

  const circuitDocument = new Circuit(circuit);
  circuitDocument
    .save()
    .then((savedCircuit) => {
        response.status(201).json(savedCircuit);
    })
    .catch((error) => {
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
    });
});

export default router;