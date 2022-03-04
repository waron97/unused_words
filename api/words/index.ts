import { Router } from "express";

import { create, getRandomWord, update } from "./controller";

const router = Router();

router.get("/random", getRandomWord);

router.post("/", create);

router.put("/", update);

export default router;
