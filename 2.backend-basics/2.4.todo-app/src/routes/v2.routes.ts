import {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler,
} from "express";
import { AuthController } from "../controllers/auth.controller";
import { ItemController } from "../controllers/item.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ResponseResult } from "../utils/responseResult";

const router: Router = Router();

const actions: Record<
  string,
  { middleware: RequestHandler[]; method: RequestHandler }
> = {
  login: {
    middleware: [
      AuthMiddleware.allowUnauthorized,
      AuthMiddleware.validateAuthData,
    ],
    method: AuthController.login,
  },
  register: {
    middleware: [
      AuthMiddleware.allowUnauthorized,
      AuthMiddleware.validateAuthData,
    ],
    method: AuthController.register,
  },
  logout: {
    middleware: [AuthMiddleware.allowAuthorized],
    method: AuthController.logout,
  },
  getItems: {
    middleware: [AuthMiddleware.allowAuthorized],
    method: ItemController.getItems,
  },
  createItem: {
    middleware: [AuthMiddleware.allowAuthorized],
    method: ItemController.createItem,
  },
  deleteItem: {
    middleware: [AuthMiddleware.allowAuthorized],
    method: ItemController.deleteItem,
  },
  editItem: {
    middleware: [AuthMiddleware.allowAuthorized],
    method: ItemController.editItem,
  },
};

function validateAction(req: Request, res: Response, next: NextFunction) {
  return Object.keys(actions).find((key) => key === req.query.action)
    ? next()
    : ResponseResult.NotFound().send(res);
}

function executeMiddleware(req: Request, res: Response, next: NextFunction) {
  const action = actions[String(req.query.action)].middleware;
  let i = 0;
  const nextMiddleware = (err: any) => {
    if (err) {
      return next(err);
    }
    i++;
    if (i < action.length) {
      action[i](req, res, nextMiddleware);
    } else {
      next();
    }
  };
  action[0](req, res, nextMiddleware);
}

router.post("/router", validateAction, executeMiddleware, (req, res, next) => {
  const action = actions[String(req.query.action)];
  return action.method(req, res, next);
});

export const RouterV2: Router = router;
