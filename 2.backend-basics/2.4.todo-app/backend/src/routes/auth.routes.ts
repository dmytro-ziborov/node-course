import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/login",
  AuthMiddleware.allowUnauthorized,
  AuthMiddleware.validateAuthData,
  AuthController.login
);

router.post(
  "/register",
  AuthMiddleware.allowUnauthorized,
  AuthMiddleware.validateAuthData,
  AuthController.register
);
router.post("/logout", AuthMiddleware.allowAuthorized, AuthController.logout);

export const AuthRouter: Router = router;
