import dayjs from "dayjs";

import WordModel from "../words/model";
import { Command } from "./service";

export const createWord: Command = async (text, chatData) => {
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

export const getWord: Command = async (text, chatData) => {
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

export const createFromList: Command = async (t, chat, fullText) => {
  const spl = fullText.split("\n").slice(1);
  for (const line of spl) {
    await createWord(line.split(" "), chat, fullText);
  }
  return "Le parole della lista fornita sono state caricate";
};

export const readAll: Command = async () => {
  return "";
};

export const updateWord: Command = async (text) => {
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
};

export const getHelp: Command = async () =>
  `Creare una parola: '@c Pellicola'
  
  Creare una parola con definizione: '@c pellicola Attrezzo cinematografico.'
  
  Associare definizione a parola: '@u pellicola Attrezzo cinematografico.'
  
  Creare parole a partire da una lista:
  @cl
  Pellicola Attrezzo cinematografico
  Ciao Un saluto comune
  `;

export const getSummary: Command = async (text) => {
  const allWords = await WordModel.find();
  const pageStr = text[1];
  let page = pageStr ? parseInt(pageStr) : 1;
  page = !isNaN(page) && page > 0 ? page : 1;
  page = page - 1;
  const limit = 20;
  const from = page * limit;
  const to = (page + 1) * limit;
  const toReturn = allWords.slice(from, to);
  const total = allWords.length;
  const maxPages = Math.ceil(total / limit);
  return `
Ci sono ${total} parole aggiunte.

Pagina ${page + 1} di ${maxPages + 1}:
${toReturn.map((entry) => entry.word).join("\n")}
  `;
};
