import { NextFunction, Request, Response } from "express";
import { ResponseResult } from "../utils/responseResult";

export const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    return ResponseResult.InternalServerError().send(res);
  }
  return next();
};
