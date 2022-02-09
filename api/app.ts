import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import TelegramRouter from "./api/telegram";
import WordsRouter from "./api/words";
import { getMongoUrl } from "./services/mongo";

const app = express();
const mongoUrl = getMongoUrl();
console.log("mongoUrl", mongoUrl);

mongoose.connect(getMongoUrl());

app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("hello"));

app.use("/words", WordsRouter);
app.use("/telegram", TelegramRouter);

export default app;
