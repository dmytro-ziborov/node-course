import { Router } from "express";
import { AuthRouter } from "./auth.routes";
import { ItemsRouter } from "./items.routes";

const router: Router = Router();

router.use("/", AuthRouter);
router.use("/items", ItemsRouter);

export const RouterV1: Router = router;
