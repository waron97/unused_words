import { RequestHandler } from "express";

export const handleUpdates: RequestHandler = (req, res, next) => {
  console.log("body", req.body);
  res.status(200).send();
};
