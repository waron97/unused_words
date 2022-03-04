import { Schema, model } from "mongoose";

interface Word {
  word: string;
  date: Date;
  method: "page" | "telegram";
  addedBy?: string;
  definition?: string;
  examples: string[];
}

const WordsSchema = new Schema<Word>({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  method: {
    type: String,
    required: true,
    enum: ["web", "telegram"],
  },
  addedBy: {
    type: String,
  },
  definition: {
    type: String,
  },
  examples: {
    type: [String],
    default: [],
  },
});

const WordModel = model<Word>("Word", WordsSchema);

export default WordModel;
