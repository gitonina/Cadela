import express, { NextFunction, Request, Response } from "express";
import { Inscription } from "../models/inscription";

const router=express.Router()

router.get("/inscriptions", (req: Request, res: Response, next: NextFunction) => {
  Inscription.find({})
    .then((inscriptions) => {
      res.json(inscriptions);
    })
    .catch((error) => next(error));
});

router.post("/inscriptions", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const inscription = {
    club: body.club,
    fullname: body.fullname,
    dorsalnumber: body.dorsalnumber,
    category: body.category,
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