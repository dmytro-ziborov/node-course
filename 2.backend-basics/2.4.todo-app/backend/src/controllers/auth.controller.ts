import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/user.service";
import { ResponseResult } from "../utils/responseResult";

function extractAuthData(body: any): { login: any; password: any } {
  return { login: body.login, password: body.pass };
}

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = extractAuthData(req.body);
    try {
      return (await AuthService.registerUser(login, password)).send(res);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = extractAuthData(req.body);

    try {
      const result = await AuthService.loginUser(login, password);
      if (result.data.ok) {
        req.session.username = req.body.login;
      }
      return result.send(res);
    } catch (error) {
      return next(error);
    }
  },

  logout: (req: Request, res: Response, next: NextFunction) => {
    return req.session.destroy((error) => {
      if (error) {
        return next(error);
      }
      return ResponseResult.Ok().send(res);
    });
  },
};
