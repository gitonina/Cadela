import express from "express";

import { Category } from '../models/category';
import { Circuit } from '../models/circuit';
import { CyclingRace } from '../models/cyclingRace';
import Cyclist from '../models/cyclist';
import { Inscription } from '../models/inscription';
import { Result } from '../models/result';

const router = express.Router();

router.post('/reset', async (_req, res) => {
  await Category.deleteMany({});
  await Circuit.deleteMany({});
  await CyclingRace.deleteMany({});
  await Cyclist.deleteMany({});
  await Inscription.deleteMany({});
  await Result.deleteMany({});
  res.status(204).end();
});

export default router;