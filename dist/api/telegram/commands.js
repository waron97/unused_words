"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.getHelp = exports.updateWord = exports.readAll = exports.createFromList = exports.getWord = exports.createWord = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const model_1 = __importDefault(require("../words/model"));
const createWord = (text, chatData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const wordToAdd = text[0];
    const definition = text.slice(1).join(" ");
    if (wordToAdd) {
        try {
            console.log("text", text);
            const person = chatData.message.from;
            yield model_1.default.create({
                word: wordToAdd,
                addedBy: `${(_a = person.first_name) !== null && _a !== void 0 ? _a : ""} ${(_b = person.last_name) !== null && _b !== void 0 ? _b : ""}`,
                date: (0, dayjs_1.default)().toDate(),
                method: "telegram",
                definition,
            });
            return `Parola '${wordToAdd}' aggiunta con successo`;
        }
        catch (e) {
            return "Errore durante la creazione della parola. Potrebbe trattarsi di un duplicato.";
        }
    }
    return "Nessuna parola da aggiungere al databese è stata trovata nel messaggio";
});
exports.createWord = createWord;
const getWord = (text, chatData) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const wordToGet = text[0];
    if (wordToGet) {
        try {
            const word = yield model_1.default.findOne({ word: wordToGet });
            if (word) {
                return `La parola '${word.word}' ha id '${word._id}' e definizione '${(_c = word.definition) !== null && _c !== void 0 ? _c : ""}'`;
            }
            return "Questa parola non esiste ancora nel database";
        }
        catch (e) {
            return "Errore durante la lettura della parola";
        }
    }
    return "Nessuna parola da leggere dal databese è stata trovata nel messaggio";
});
exports.getWord = getWord;
const createFromList = (t, chat, fullText) => __awaiter(void 0, void 0, void 0, function* () {
    const spl = fullText.split("\n").slice(1);
    for (const line of spl) {
        yield (0, exports.createWord)(line.split(" "), chat, fullText);
    }
    return "Le parole della lista fornita sono state caricate";
});
exports.createFromList = createFromList;
const readAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return "";
});
exports.readAll = readAll;
const updateWord = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const wordToUpdate = text[0];
    const definition = text.slice(1).join(" ");
    if (wordToUpdate && definition) {
        const word = yield model_1.default.findOne({ word: wordToUpdate });
        if (word) {
            yield Object.assign(word, { definition }).save();
            return `La parola '${wordToUpdate}' è stata aggiornata con la definizione '${definition}'`;
        }
        return "Questa parola non esiste ancora nel database. Creala prima di assegnare una definizione";
    }
    return "Non sono stati specificati i parametri richiesti. Esempio: '@u ciao Un saluto comune.'";
});
exports.updateWord = updateWord;
const getHelp = () => __awaiter(void 0, void 0, void 0, function* () {
    return `Creare una parola: '@c Pellicola'
  
  Creare una parola con definizione: '@c pellicola Attrezzo cinematografico.'
  
  Associare definizione a parola: '@u pellicola Attrezzo cinematografico.'
  
  Creare parole a partire da una lista:
  @cl
  Pellicola Attrezzo cinematografico
  Ciao Un saluto comune
  `;
});
exports.getHelp = getHelp;
const getSummary = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const allWords = yield model_1.default.find();
    const pageStr = text[0];
    console.log("text", text);
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

Pagina ${page + 1} di ${maxPages}:
${toReturn.map((entry) => entry.word).join("\n")}
  `;
});
exports.getSummary = getSummary;
