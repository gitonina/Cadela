import express, { NextFunction, Request, Response } from "express";
import { Inscription } from "../models/inscription";
import Cyclist from "../models/cyclist"

const router=express.Router()

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  Inscription.find({})    
    .populate({
      path: 'cyclingRaceId',
      populate: {
        path: 'circuitId', 
        select: 'name'
      },
      select: "date"
    })
    .populate({
      path: 'cyclistId',
      select: 'name club n_dorsal'
    })
    .populate({
      path: 'categoryId',
      select: 'name'
    })
    .then((inscriptions) => {
      res.json(inscriptions);
    })
    .catch((error) => next(error));
});

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = await Cyclist.findById(body.cyclistId);

    if (!user) {
      return response.status(400).json({error: "user not found",});
    }

    if (!body.cyclingRaceId || !body.categoryId) {
    return response.status(400).json({ error: "missing required fields" });
    }
    const inscription = new Inscription({
    cyclingRaceId: body.cyclingRaceId,
    cyclistId: user?.id,
    categoryId: body.categoryId,
    });

    const savedInscription = await inscription.save();
    user.inscriptions = user.inscriptions.concat(savedInscription._id);
    await user.save();

    return response.status(201).json(savedInscription);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
    next(error);
  }
});

export default router;