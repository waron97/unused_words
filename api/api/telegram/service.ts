import dayjs from "dayjs";

import WordModel from "../words/model";
import { ChatUpdate } from "./types";

type Command = (
  text: string[],
  chatData: ChatUpdate,
  rawText: string
) => Promise<string>;
interface Commands {
  [key: string]: Command;
}

const createWord: Command = async (text, chatData) => {
  const wordToAdd = text[0];
  const definition = text.slice(1).join(" ");
  if (wordToAdd) {
    try {
      console.log("text", text);
      const person = chatData.message.from;
      await WordModel.create({
        word: wordToAdd,
        addedBy: `${person.first_name ?? ""} ${person.last_name ?? ""}`,
        date: dayjs().toDate(),
        method: "telegram",
        definition,
      });
      return `Parola '${wordToAdd}' aggiunta con successo`;
    } catch (e) {
      return "Errore durante la creazione della parola. Potrebbe trattarsi di un duplicato.";
    }
  }
  return "Nessuna parola da aggiungere al databese è stata trovata nel messaggio";
};

const getWord: Command = async (text, chatData) => {
  const wordToGet = text[0];
  if (wordToGet) {
    try {
      const word = await WordModel.findOne({ word: wordToGet });
      if (word) {
        return `La parola '${word.word}' ha id '${word._id}' e definizione '${
          word.definition ?? ""
        }'`;
      }
      return "Questa parola non esiste ancora nel database";
    } catch (e) {
      return "Errore durante la lettura della parola";
    }
  }
  return "Nessuna parola da leggere dal databese è stata trovata nel messaggio";
};

const createFromList: Command = async (t, chat, fullText) => {
  const spl = fullText.split("\n").slice(1);
  for (const line of spl) {
    await createWord(line.split(" "), chat, fullText);
  }
  return "Le parole della lista fornita sono state caricate";
};

const getHelp: Command = async () =>
  `Creare una parola: '@c Pellicola'

Creare una parola con definizione: '@c pellicola Attrezzo cinematografico.'

Associare definizione a parola: '@u pellicola Attrezzo cinematografico.'

Creare parole a partire da una lista:
@cl
Pellicola Attrezzo cinematografico
Ciao Un saluto comune
`;

const commands: Commands = {
  "@r": getWord,
  "@c": createWord,
  "@d": async (text) => {
    return "";
  },
  "@u": async (text) => {
    const wordToUpdate = text[0];
    const definition = text.slice(1).join(" ");
    if (wordToUpdate && definition) {
      const word = await WordModel.findOne({ word: wordToUpdate });
      if (word) {
        await Object.assign(word, { definition }).save();
        return `La parola '${wordToUpdate}' è stata aggiornata con la definizione '${definition}'`;
      }
      return "Questa parola non esiste ancora nel database. Creala prima di assegnare una definizione";
    }
    return "Non sono stati specificati i parametri richiesti. Esempio: '@u ciao Un saluto comune.'";
  },
  "@cl": createFromList,
  "/help": getHelp,
  "/start": getHelp,
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
