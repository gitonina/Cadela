import express, { NextFunction, Request, Response } from "express";
import { Category } from "../models/category";
import { authenticateToken,requireRole } from "../utils/middleware";
const router=express.Router()

router.get("/",authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  Category.find({})    
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => next(error));
});

export default router;