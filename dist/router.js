"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("./authService");
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const createHandler_1 = require("./handlers/productHandlers/createHandler");
const fetchHandler_1 = require("./handlers/productHandlers/fetchHandler");
const listHandler_1 = require("./handlers/productHandlers/listHandler");
const removeHandler_1 = require("./handlers/productHandlers/removeHandler");
const updateHandler_1 = require("./handlers/productHandlers/updateHandler");
const userHandler_1 = require("./handlers/userHandler");
const prisma = new client_1.PrismaClient();
authService_1.AuthService.initializePrisma(prisma);
const router = express_1.default.Router();
router.get('/', (res) => { res.send("welcome"); });
router.get('/user/register', authService_1.AuthService.signup);
router.get('/user/login', authService_1.AuthService.signin);
router.get('/user/logout', authService_1.AuthService.logout);
router.get('/user/access', authService_1.AuthService.access);
router.get('/user/list', userHandler_1.listUsers);
router.get('/user/fetch', userHandler_1.fetchUser);
router.get('/product/list', listHandler_1.listProducts);
router.post('/product/create', createHandler_1.create);
router.delete('/product/remove/:id', removeHandler_1.remove);
router.put('/product/update/:id', updateHandler_1.updateProduct);
router.get('/product/:id', fetchHandler_1.fetchProduct);
exports.default = router;
