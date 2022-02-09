import { Schema, model } from "mongoose";

interface Word {
  word: string;
  date: Date;
  method: "page" | "telegram";
  addedBy?: string;
}

const WordsSchema = new Schema<Word>({
  word: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  method: {
    type: String,
    required: true,
    enum: ["page", "telegram"],
  },
  addedBy: {
    type: String,
  },
});

const WordModel = model<Word>("Word", WordsSchema);

export default WordModel;
