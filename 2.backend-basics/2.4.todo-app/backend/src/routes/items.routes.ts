import { NextFunction, Request, Response, Router } from "express";
import { ItemController } from "../controllers/item.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.get("/", AuthMiddleware.allowAuthorized, ItemController.getItems);
router.post("/", AuthMiddleware.allowAuthorized, ItemController.createItem);
router.put("/", AuthMiddleware.allowAuthorized, ItemController.editItem);
router.delete("/", AuthMiddleware.allowAuthorized, ItemController.deleteItem);

export const ItemsRouter: Router = router;
