import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./utils/config";
import mongoose from "mongoose";
import middleware from "./utils/middleware";
import inscriptionRouter from "./controllers/inscriptions";
import categoriesRouter from "./controllers/categories";
import circuitRouter from "./controllers/circuits";
import cyclingRacesRouter from "./controllers/cyclingRaces";
import resultRouter from "./controllers/results";
import loginRouter from "./controllers/login";
import signInRouter from "./controllers/cyclists";
import testingRouter from "./controllers/testing"; 
import roleRouter from "./controllers/roles"
import logger from "./utils/logger";
import path from "path";
import cookieParser from "cookie-parser";
const app = express();
mongoose.set("strictQuery", false);



if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static(path.resolve(__dirname, "dist")));
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use("/api/inscriptions", inscriptionRouter);
app.use("/api/circuits", circuitRouter);
app.use("/api/cycling-races", cyclingRacesRouter);
app.use("/api/results", resultRouter);
app.use("/api/cyclists", signInRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/login", loginRouter)
app.use("/api/roles",roleRouter)

if (process.env.NODE_ENV === 'test') {    
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;