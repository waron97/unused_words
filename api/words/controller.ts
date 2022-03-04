import { RequestHandler } from "express";

import WordModel from "./model";

export const getRandomWord: RequestHandler = async (req, res) => {
  const sample = await WordModel.aggregate([{ $sample: { size: 1 } }]);
  if (sample && sample.length) {
    res.json({ word: sample[0] });
  } else {
    res.status(500).json({
      error: "NO_WORDS",
      message: "There are no recorded words in the database",
    });
  }
};

export const create: RequestHandler = async (req, res, next) => {
  const { body } = req;
  try {
    const item = await WordModel.create(body);
    if (item) {
      res.json(item);
    } else {
      res.status(500).json({ error: "FAIL", message: "Failed to create word" });
    }
  } catch (e) {
    next(e);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const updated = WordModel.findByIdAndUpdate(id, body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
};
