import express, { NextFunction, Request, Response } from "express";
import { Inscription } from "../models/inscription";

const router=express.Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  Inscription.find({})
    .then((inscriptions) => {
      res.json(inscriptions);
    })
    .catch((error) => next(error));
});

router.post("/", (request, response, next) => {
  const body = request.body;

  /*if (!body.fullname || !body.dorsalnumber || !body.category) {*/
  /*  return response.status(400).json({ error: "missing required fields" });*/
  /*}*/

  if (!body.cyclingRaceId || !body.cyclistId || !body.categoryId) {
    return response.status(400).json({ error: "missing required fields" });
  }

  const inscription = {
    cyclingRaceId: body.cyclingRaceId,
    cyclistId: body.cyclistId,
    categoryId: body.categoryId,
    /*club: body.club,*/
    /*fullname: body.fullname,*/
    /*dorsalnumber: body.dorsalnumber,*/
    /*category: body.category,*/
  };

  const inscriptionDocument = new Inscription(inscription);
    inscriptionDocument
      .save()
      .then((savedInscription) => {
        response.status(201).json(savedInscription);
      })
      .catch((error) => {
      if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
      }
      next(error);
    });
});

export default router;