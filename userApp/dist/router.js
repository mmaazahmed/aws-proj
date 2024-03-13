"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("./authService");
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("./userHandler");
const router = express_1.default.Router();
router.post('/user/register', authService_1.signup);
router.post('/user/login', authService_1.signin);
router.post('/user/logout', authService_1.logout);
router.post('/user/access', authService_1.access);
router.get('/user/list', userHandler_1.listUsers);
router.get('/user/fetch', userHandler_1.fetchUser);
exports.default = router;
