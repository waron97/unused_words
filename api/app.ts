import express from "express";
import mongoose from "mongoose";

import TelegramRouter from "./api/telegram";
import WordsRouter from "./api/words";
import { getMongoUrl } from "./services/mongo";

const app = express();

app.get("/", (req, res, next) => res.send("hello"));

app.use("/words", WordsRouter);
app.use("/telegram", TelegramRouter);

mongoose.connect(getMongoUrl());

export default app;
