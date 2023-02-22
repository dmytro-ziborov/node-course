import { Router } from "express";
import { ErrorHandler } from "../middleware/error.handler";
import { RouterV1 } from "./v1.routes";
import { RouterV2 } from "./v2.routes";

const router: Router = Router();

router.use("/v1", RouterV1);
router.use("/v2", RouterV2);
router.use(ErrorHandler);

export const MainRouter: Router = router;
