"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require("dotenv/config");
const server = (0, express_1.default)();
exports.server = server;
server.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Ok' });
});
