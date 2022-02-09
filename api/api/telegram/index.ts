import { Router } from "express";

import { handleUpdates } from "./model";

const router = Router();

router.get("updates", handleUpdates);

export default router;
