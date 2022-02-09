"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WordsSchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    method: {
        type: String,
        required: true,
        enum: ["page", "telegram"],
    },
    addedBy: {
        type: String,
    },
});
const WordModel = (0, mongoose_1.model)("Word", WordsSchema);
exports.default = WordModel;
