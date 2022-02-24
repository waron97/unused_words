"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv").config({ path: __dirname + "/.env" });
app_1.default.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => console.log("Server listening on port 3000"));
