import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import httpStatusText from "../utils/httpStatusText";
import appError from "../utils/appError";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    const error = appError.create(
      "Token is required",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      [key: string]: any;
    };
    req.currentUser = currentUser;
    return next();
  } catch (err) {
    const error = appError.create("Invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

export default verifyToken;
