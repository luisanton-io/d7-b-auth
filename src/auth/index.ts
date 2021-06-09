import atob from "atob";
import ErrorResponse from "../lib/errorResponse";
import { Request, Response, NextFunction } from 'express'

import AuthorSchema from "../schemas/authors";

export const basicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    next(new ErrorResponse(401, "Please provide auth!"));
  } else {
    const decoded = atob(req.headers.authorization.split(" ")[1]);
    const [email, password] = decoded.split(":");

    const user = await AuthorSchema.checkCredentials(email, password);
    if (user) {
      req.body.user = user;
      next();
    } else {
      next(new ErrorResponse(401, "Credentials are wrong!"));
    }
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user.role === "Admin") {
    next();
  } else {
    next(new ErrorResponse(403, "Admin only"));
  }
};
