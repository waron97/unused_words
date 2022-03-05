import { Router } from "express";

import { create, destroy, getAll, getRandomWord, update } from "./controller";

const router = Router();

router.get("/", getAll);

router.get("/random", getRandomWord);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", destroy);

export default router;
