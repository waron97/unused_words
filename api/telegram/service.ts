import dayjs from "dayjs";

import WordModel from "../words/model";
import * as executors from "./commands";
import { ChatUpdate } from "./types";

export type Command = (
  text: string[],
  chatData: ChatUpdate,
  rawText: string
) => Promise<string>;
interface Commands {
  [key: string]: Command;
}

const commands: Commands = {
  "@r": executors.getWord,
  "@c": executors.createWord,
  "@d": async (text) => {
    return "";
  },
  "@u": executors.updateWord,
  "@cl": executors.createFromList,
  "@ra": executors.readAll,
  "@tot": executors.getSummary,
  "/help": executors.getHelp,
  "/start": executors.getHelp,
};

export async function executeCommand(
  command: string,
  text: string[],
  chatData: ChatUpdate,
  rawText: string
) {
  const callback = commands[command];
  if (!callback) return "Comando non riconosciuto";
  return await callback(text, chatData, rawText);
}
