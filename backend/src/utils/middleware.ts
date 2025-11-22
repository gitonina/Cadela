import { NextFunction, Request, Response } from "express";
import logger from "./logger";
import jwt from "jsonwebtoken";
import config from "./config";
import { Role } from "../models/roles";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: {
        id: string;
        name?: string;
        rolId?: string;
      };
    }
  }
}

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};
const unknownEndpoint = (request: Request, response: Response) => {
 response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (
  error: { name: string; message: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  console.error(error.name);
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }

  else if (error.name === "JsonWebTokenError") {
response.status(401).json({ error: "invalid token" });
} else if (error.name === "TokenExpiredError") {
response.status(401).json({ error: "token expired" });
}

  next(error);
};

export const withUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req;
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ error: "missing token" });
    } else {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const csrfToken = req.headers["x-csrf-token"];
      if (
        typeof decodedToken === "object" &&
        decodedToken.id &&
        decodedToken.csrf == csrfToken
      ) {
        authReq.userId = decodedToken.id;
        next();
      } else {
        res.status(401).json({ error: "invalid token" });
      }
    }
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "No autenticado", message: "Token no proporcionado" });
    }

    jwt.verify(token, config.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido", message: err.message });
      }

      req.user = {
        id: decoded.id,
        name: decoded.name,
        rolId: decoded.rolId,
      };
      req.userId = decoded.id;

      next();
    });
  } catch (error) {
    console.error("Error en authenticateToken:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const requireRole = (roles: Array<"admin" | "cyclist">) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const role = await Role.findById(req.user.rolId);
    if (!role) {
      return res.status(500).json({ error: "Rol no encontrado" });
    }

    if (!roles.includes(role.name)) {
      return res.status(403).json({ error: "No autorizado" });
    }

    next();
  };
};


export default {requestLogger,unknownEndpoint,errorHandler};