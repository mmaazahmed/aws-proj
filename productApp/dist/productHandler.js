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
exports.create = exports.fetchProduct = exports.listProducts = exports.remove = exports.updateProduct = void 0;
const ProductDAO_1 = require("./ProductDAO");
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, stock } = req.body;
            const productId = parseInt(req.params.id, 10);
            const updatedProduct = yield (0, ProductDAO_1.updateProductById)(productId, name, description, price, stock);
            res.json({ message: "product update successfull",
                updated_product: updatedProduct
            });
        }
        catch (error) {
            console.error('product update failed', error);
            res.send('product update failed');
        }
    });
}
exports.updateProduct = updateProduct;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.id, 10);
            yield (0, ProductDAO_1.removeProduct)(productId);
            res.send("product successfully removed");
        }
        catch (error) {
            console.error('product removal failed', error);
            res.send("product deletion failed");
        }
    });
}
exports.remove = remove;
function listProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, ProductDAO_1.fetchAllProducts)();
            res.send(products);
        }
        catch (error) {
            console.error('Error fetching products:', error);
            res.send('Internal Server Error');
        }
    });
}
exports.listProducts = listProducts;
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
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, stock } = req.body;
            yield (0, ProductDAO_1.createProduct)(name, description, price, stock);
            res.send('product creation success');
        }
        catch (error) {
            console.error('Error creating product:', error);
            res.send('Internal Server Error');
        }
    });
}
exports.create = create;
