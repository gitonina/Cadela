import express, { NextFunction, Request, Response } from "express";
import { CyclingRace } from "../models/cyclingRace";

const router=express.Router()

router.get("/cycling-races", (req: Request, res: Response, next: NextFunction) => {
  CyclingRace.find({})
    .then((cyclingRaces) => {
      res.json(cyclingRaces);
    })
    .catch((error) => next(error));
});

router.post("/cycling-races", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  };

  const cyclingRace = {
    circuitId: body.circuitId,
    date: body.date,
  };

  const cyclingRaceDocument = new CyclingRace(cyclingRace);
  cyclingRaceDocument
    .save()
    .then((savedCyclingRace) => {
        response.status(201).json(savedCyclingRace);
    })
    .catch((error) => {
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
    });
});

export default router;