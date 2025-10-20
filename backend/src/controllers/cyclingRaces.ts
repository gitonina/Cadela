import express, { NextFunction, Request, Response } from "express";
import { CyclingRace } from "../models/cyclingRace";

const router=express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  CyclingRace.find({})
    .populate({
        path: 'circuitId',
        select: 'name distance elevationGain kml_path pathPhoto'
    })
    .then((cyclingRaces) => {
      res.json(cyclingRaces);
    })
    .catch((error) => next(error));
});

router.get("/upcoming", (req: Request, res: Response, next: NextFunction) => {
  CyclingRace.find({
      date: { $gt: new Date() }
    })
    .populate({
        path: 'circuitId',
        select: 'name distance elevationGain kml_path pathPhoto'
    })
    .then((cyclingRaces) => {
      res.json(cyclingRaces);
    })
    .catch((error) => next(error));
});

router.get("/next", (req: Request, res: Response, next: NextFunction) => {
  CyclingRace.find({
      date: { $gt: new Date() }
    })
    .limit(1)
    .populate({
        path: 'circuitId',
        select: 'name distance elevationGain kml_path pathPhoto'
    })
    .then((cyclingRaces) => {
      res.json(cyclingRaces);
    })
    .catch((error) => next(error));
});

router.get("/past", (req: Request, res: Response, next: NextFunction) => {
  CyclingRace.find({
      date: { $lt: new Date() }
    })
    .populate({
        path: 'circuitId',
        select: 'name distance elevationGain kml_path pathPhoto'
    })
    .then((cyclingRaces) => {
      res.json(cyclingRaces);
    })
    .catch((error) => next(error));
});

router.post("/", (request, response, next) => {
  const body = request.body;

  if (!body.circuitId || !body.date) {
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