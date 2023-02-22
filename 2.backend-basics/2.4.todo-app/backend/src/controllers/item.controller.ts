import { NextFunction, Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { ResponseResult } from "../utils/responseResult";

export const ItemController = {
  getItems: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.session.username;
      if (!username) return ResponseResult.NotFound().send(res);
      return (await ItemService.getUserItems(username)).send(res);
    } catch (error) {
      next(error);
    }
  },

  createItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.session.username;
      if (!username) return ResponseResult.NotFound().send(res);
      return (await ItemService.createItem(username, req.body.text)).send(res);
    } catch (error) {
      next(error);
    }
  },

  editItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.session.username;
      if (!username) return ResponseResult.NotFound().send(res);
      return (
        await ItemService.editItem(
          username,
          req.body.id,
          req.body.text,
          req.body.checked
        )
      ).send(res);
    } catch (error) {
      next(error);
    }
  },

  deleteItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.session.username;
      if (!username) return ResponseResult.NotFound().send(res);
      return (await ItemService.deleteItem(username, req.body.id)).send(res);
    } catch (error) {
      next(error);
    }
  },
};
