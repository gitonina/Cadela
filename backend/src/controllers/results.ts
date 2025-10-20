import express, { NextFunction, Request, Response } from "express";
import { Result } from "../models/result";

const router=express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Result.find({})
    .then((results) => {
      res.json(results);
    })
    .catch((error) => next(error));
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const cyclingRaceId = req.params.id;
  Result.find()
    .populate({
        path: 'inscriptionId',
        match: { cyclingRaceId: cyclingRaceId },
        select: 'cyclistId categoryId'
    })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => next(error));
});


export default router;