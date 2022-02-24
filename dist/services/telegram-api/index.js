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
exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const botApiKey = process.env.BOT_API_KEY;
const telegramApiBaseUrl = "https://api.telegram.org";
function getBaseUrl() {
    return `${telegramApiBaseUrl}/bot${botApiKey}`;
}
function sendMessage(chatId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${getBaseUrl()}/sendMessage`;
        const body = { chat_id: chatId, text };
        return yield executeRequest(url, "POST", body);
    });
}
exports.sendMessage = sendMessage;
function executeRequest(url, method, body) {
    return __awaiter(this, void 0, void 0, function* () {
        // const requestBody = JSON.stringify(body);
        const { data } = yield (0, axios_1.default)(url, { data: body, method });
        return data;
    });
}
