import express, { NextFunction, Request, Response } from "express";
import { Category } from "../models/category";

const router=express.Router()

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
});