"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoUrl = void 0;
const getMongoUrl = () => {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    return `mongodb+srv://${username}:${password}@cluster0.wrosh.mongodb.net/words?retryWrites=true&w=majority`;
};
exports.getMongoUrl = getMongoUrl;
