import { inspect } from "util";

import { RequestHandler } from "express";

import { sendMessage } from "../../services/telegram-api";
import WordModel from "../words/model";
import { executeCommand } from "./service";
import { ChatUpdate } from "./types";

export const handleUpdates: RequestHandler = async (req, res, next) => {
  const chatData: ChatUpdate = req.body;

  const text = chatData.message.text;

  const split = text.split(/[ \n]/).filter((i) => i);

  const command = split[0];

  const responseText = await executeCommand(
    command,
    split.slice(1),
    chatData,
    text
  );

  await sendMessage(chatData.message.chat.id, responseText);

  res.status(200).send();
};
