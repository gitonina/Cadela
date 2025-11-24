import express from "express";
import bcrypt from "bcrypt";

import { Category } from '../models/category';
import { Circuit } from '../models/circuit';
import { CyclingRace } from '../models/cyclingRace';
import Cyclist from '../models/cyclist';
import { Inscription } from '../models/inscription';
import { Result } from '../models/result';
import { Role  } from "../models/roles";
const router = express.Router();

router.post('/reset', async (_req, res) => {
  await Category.deleteMany({});
  await Circuit.deleteMany({});
  await CyclingRace.deleteMany({});
  await Cyclist.deleteMany({});
  await Inscription.deleteMany({});
  await Result.deleteMany({});
  await Role.deleteMany({}); 

  const adminRole = new Role({ name: "admin" }); 
  const cyclistRole = new Role({ name: "cyclist" }); 
  await adminRole.save(); 
  await cyclistRole.save();

  const passwordHash = await bcrypt.hash("adminpassword", 10);

  const adminUser = new Cyclist({
    rut: "999999999",
    name: "Administrador E2E",
    club: "Admin Club",
    n_dorsal: 9999,
    password: passwordHash, 
    rolId: adminRole._id
  });

  await adminUser.save();
  res.status(204).end();
});

export default router;