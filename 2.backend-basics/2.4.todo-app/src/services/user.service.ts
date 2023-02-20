import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser, User } from "../database/models/user.model";
import { ResponseResult } from "../utils/responseResult";

const newUser = (login: string, password: string): IUser => {
  return { login: login, password: password, items: [] };
};

export const AuthService = {
  registerUser: async (
    login: string,
    password: string
  ): Promise<ResponseResult> => {
    try {
      await User.create(newUser(login, password));
      return ResponseResult.Ok();
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return ResponseResult.Conflict({ message: "user already exists" });
      }
      return ResponseResult.InternalServerError();
    }
  },

  loginUser: async (login: string, password: string) => {
    const user = await User.findOne({ login: login });
    try {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return ResponseResult.NotFound();
      }
      return ResponseResult.Ok();
    } catch (error) {
      return ResponseResult.InternalServerError();
    }
  },
};
