import { Response, Request, NextFunction } from "express";
//console logger for requests
export default (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
