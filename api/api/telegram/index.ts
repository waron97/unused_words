import { Router } from "express";

import { handleUpdates } from "./model";

const router = Router();

router.post("updates", handleUpdates);

export default router;
