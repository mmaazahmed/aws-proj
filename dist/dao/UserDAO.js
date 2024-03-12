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
exports.createUser = exports.fetchUserByEmail = exports.fetchAllUsers = void 0;
const client_1 = require("@prisma/client");
function createUser(name, email, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
        }
        catch (error) {
            console.error("error creating user");
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.createUser = createUser;
function fetchUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.user.findUniqueOrThrow({
                where: {
                    email: email,
                },
            });
        }
        catch (error) {
            console.error("problem finding user", error);
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.fetchUserByEmail = fetchUserByEmail;
function fetchAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        try {
            return yield prisma.user.findMany();
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
        finally {
            prisma.$disconnect();
        }
    });
}
exports.fetchAllUsers = fetchAllUsers;
