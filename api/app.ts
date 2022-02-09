import express from "express";
import mongoose from "mongoose";

import TelegramRouter from "./api/telegram";
import WordsRouter from "./api/words";

const app = express();

app.use("/words", WordsRouter);
app.use("/telegram", TelegramRouter);

mongoose.connect(
  "mongodb://mongoadmin:secret@localhost:27888/?authSource=admin"
);

export default app;
