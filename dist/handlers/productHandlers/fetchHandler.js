"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProduct = void 0;
const ProductDAO_1 = require("../../dao/ProductDAO");
function fetchProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.id, 10);
            const product = yield (0, ProductDAO_1.fetchProductById)(productId);
            res.send(product);
        }
        catch (error) {
            console.error('product does not exist with that id', error);
            res.send("no product does not exist with that id");
        }
    });
}
exports.fetchProduct = fetchProduct;
