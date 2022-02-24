"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = void 0;
const executors = __importStar(require("./commands"));
const commands = {
    "@r": executors.getWord,
    "@c": executors.createWord,
    "@d": (text) => __awaiter(void 0, void 0, void 0, function* () {
        return "";
    }),
    "@u": executors.updateWord,
    "@cl": executors.createFromList,
    "@ra": executors.readAll,
    "@tot": executors.getSummary,
    "/help": executors.getHelp,
    "/start": executors.getHelp,
};
function executeCommand(command, text, chatData, rawText) {
    return __awaiter(this, void 0, void 0, function* () {
        const callback = commands[command];
        if (!callback)
            return "Comando non riconosciuto";
        return yield callback(text, chatData, rawText);
    });
}
exports.executeCommand = executeCommand;
