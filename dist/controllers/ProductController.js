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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ProductDAO_1 = require("../dao/ProductDAO");
dotenv_1.default.config();
class ProductController {
    static initializePrisma(prisma) {
        if (ProductController.prisma) {
            return;
        }
        ProductController.prisma = prisma;
        ProductDAO_1.ProductDAO.initializePrisma(prisma);
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const product = yield ProductDAO_1.ProductDAO.fetchProductById(productId);
                res.send(product);
            }
            catch (error) {
                console.error('product does not exist with that id', error);
                res.send("no product does not exist with that id");
            }
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, stock } = req.body;
                yield ProductDAO_1.ProductDAO.createProduct(name, description, price, stock);
                res.send('product creation success');
            }
            catch (error) {
                console.error('Error creating product:', error);
                res.send('Internal Server Error');
            }
        });
    }
    static listProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductDAO_1.ProductDAO.fetchAllProducts();
                res.send(products);
            }
            catch (error) {
                console.error('Error fetching products:', error);
                res.send('Internal Server Error');
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, stock } = req.body;
                const productId = parseInt(req.params.id, 10);
                const updatedProduct = yield ProductDAO_1.ProductDAO.updateProduct(productId, name, description, price, stock);
                res.send('product update success').json(updatedProduct);
            }
            catch (error) {
                console.error('product update failed', error);
                res.send('product update failed');
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                yield ProductDAO_1.ProductDAO.deleteProduct(productId);
                res.send("product successfully removed");
            }
            catch (error) {
                console.error('product deletion failed', error);
                res.send("product deletion failed");
            }
        });
    }
}
exports.ProductController = ProductController;
