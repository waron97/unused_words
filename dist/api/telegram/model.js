"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdates = void 0;
const handleUpdates = (req, res, next) => {
    console.log("body", req.body);
    res.status(200).send();
};
exports.handleUpdates = handleUpdates;
