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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdates = void 0;
const telegram_api_1 = require("../../services/telegram-api");
const service_1 = require("./service");
const handleUpdates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chatData = req.body;
    const text = chatData.message.text;
    const split = text.split(/[ \n]/).filter((i) => i);
    const command = split[0];
    const responseText = yield (0, service_1.executeCommand)(command, split.slice(1), chatData, text);
    yield (0, telegram_api_1.sendMessage)(chatData.message.chat.id, responseText);
    res.status(200).send();
});
exports.handleUpdates = handleUpdates;
