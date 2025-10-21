import express, { NextFunction, Request, Response } from "express";
import { Result } from "../models/result";
import { Inscription } from "../models/inscription";
import mongoose from "mongoose";

const router=express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Result.find({})
    .then((results) => {
      res.json(results);
    })
    .catch((error) => next(error));
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const cyclingRaceId = req.params.id

  let cyclingRaceObjectId 

  try {
    cyclingRaceObjectId = new mongoose.Types.ObjectId(cyclingRaceId);
    console.log('ObjectId creado:', cyclingRaceObjectId);
  } catch (e) {
    return res.status(400).json({ error: 'ID no se puede convertir a ObjectId' });
  }

  const inscriptionsCyclingRaceIds = await Inscription
    .find({cyclingRaceId: cyclingRaceObjectId})
    .select('_id')
    .catch((error) => next(error));

  const resultsByCyclingRaceId = await Result
    .find({inscriptionId: { $in: inscriptionsCyclingRaceIds}})
    .populate({
      path: "inscriptionId",
      populate: [
        { 
          path: "cyclistId",
          select: "name club n_dorsal"
        },
        { 
          path: "categoryId",
          select: "name"
        }
      ]
    })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => next(error));
});


export default router;