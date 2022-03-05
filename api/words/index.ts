import { Router } from "express";

import { create, getAll, getRandomWord, update } from "./controller";

const router = Router();

router.get("/", getAll);

router.get("/random", getRandomWord);

router.post("/", create);

router.put("/", update);

export default router;
