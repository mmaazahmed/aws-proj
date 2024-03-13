"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productHandler_1 = require("./productHandler");
const router = express_1.default.Router();
// router.get('/',(res:Response)=>{res.send("welcome");})
router.get('/product/list', productHandler_1.listProducts);
router.get('/product/:id', productHandler_1.fetchProduct);
router.post('/product/create', productHandler_1.create);
router.delete('/product/remove/:id', productHandler_1.remove);
router.put('/product/update/:id', productHandler_1.updateProduct);
exports.default = router;
