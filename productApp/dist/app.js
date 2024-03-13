"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const router_1 = __importDefault(require("./router"));
// const serverless = require('serverless-http');
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/api',(req:Request, res:Response) =>{
//     res.send('Hello World!')
//   });
app.use(express_1.default.json());
app.use('/api', router_1.default);
exports.default = app;
module.exports.handler = (0, serverless_http_1.default)(app);
