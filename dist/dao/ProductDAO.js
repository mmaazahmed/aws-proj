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
exports.fetchAllProducts = exports.fetchProductById = exports.createProduct = exports.removeProduct = exports.updateProductById = void 0;
const client_1 = require("@prisma/client");
function createProduct(name, description, price, stock) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    stock
                },
            });
        }
        catch (error) {
            console.error("error creating product");
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.createProduct = createProduct;
function fetchProductById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.product.findUniqueOrThrow({
                where: {
                    id: productId,
                },
            });
        }
        catch (error) {
            console.error("problem finding product", error);
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.fetchProductById = fetchProductById;
function fetchAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.product.findMany();
        }
        catch (error) {
            throw (error);
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.fetchAllProducts = fetchAllProducts;
function updateProductById(productId, name, description, price, stock) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.product.update({
                where: { id: productId },
                data: {
                    name,
                    description,
                    price,
                    stock
                }
            });
        }
        catch (error) {
            throw (error);
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.updateProductById = updateProductById;
function removeProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            yield prisma.product.delete({
                where: { id: productId }
            });
        }
        catch (error) {
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.removeProduct = removeProduct;
