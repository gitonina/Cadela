import express, { NextFunction, Request, Response } from "express";
import { Circuit } from "../models/circuit";

const router=express.Router()

router.get("/circuits", (req: Request, res: Response, next: NextFunction) => {
  Circuit.find({})
    .then((circuits) => {
      res.json(circuits);
    })
    .catch((error) => next(error));
});

router.post("/circuits", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  };

  const circuit = {
    name: body.circuitName,
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