import express, { NextFunction, Request, Response } from "express";
import { Category } from "../models/category";

const router=express.Router()

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  Category.find({})    
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => next(error));
});

export default router;