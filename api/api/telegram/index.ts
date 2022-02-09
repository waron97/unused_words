import { Router } from "express";

import { handleUpdates } from "./controller";

const router = Router();

router.post("/updates", handleUpdates);

export default router;
