"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const telegram_1 = __importDefault(require("./api/telegram"));
const words_1 = __importDefault(require("./api/words"));
const app = (0, express_1.default)();
app.use("/words", words_1.default);
app.use("/telegram", telegram_1.default);
mongoose_1.default.connect("mongodb://mongoadmin:secret@localhost:27888/words?authSource=admin");
exports.default = app;
