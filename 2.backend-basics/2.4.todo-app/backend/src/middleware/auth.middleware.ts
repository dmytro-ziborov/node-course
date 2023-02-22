import { Request, NextFunction, Response } from "express";
import { ResponseResult } from "../utils/responseResult";

export const AuthMiddleware = {
  validateAuthData: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.login && req.body.pass) {
      return next();
    } else {
      return ResponseResult.BadRequest().send(res);
    }
  },
  allowUnauthorized: (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.username) {
      return next();
    }
    return ResponseResult.Forbidden().send(res);
  },
  allowAuthorized: (req: Request, res: Response, next: NextFunction) => {
    if (req.session.username) {
      return next();
    }
    return ResponseResult.Forbidden().send(res);
  },
};
