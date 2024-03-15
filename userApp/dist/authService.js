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
exports.logout = exports.signup = exports.signin = exports.access = void 0;
const UserDAO_1 = require("./UserDAO");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Password = {
    hash: (password) => __awaiter(void 0, void 0, void 0, function* () {
        return (yield bcrypt.hash(password, yield bcrypt.genSalt(2)));
    }),
    isMatch: (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return (yield bcrypt.compare(password, hashedPassword));
    })
};
const Token = {
    create: (user) => jwt.sign({ userId: user.id, email: user.email }, process.env.API_KEY, { expiresIn: '1h' }),
    verify: (token) => jwt.verify(token, process.env.API_KEY, (err, decoded) => {
        if (err) {
            console.error("verification failed");
            return;
        }
        console.log('Token verified successfully:', decoded);
        return decoded;
    }),
};
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("im aa");
        const { name, email, password } = req.body;
        try {
            if (!(validator.isEmail(email) && password && name)) {
                res.status(400).json({ message: "invalid email,passwrod,name" });
                return;
            }
            const user = yield (0, UserDAO_1.fetchUserByEmail)(email);
            if (user) {
                res.status(409).json({ message: 'email already in use' });
                return;
            }
            const newUser = yield (0, UserDAO_1.createUser)(name, email, yield Password.hash(password));
            res.status(201).json({
                message: "account created successfully",
                token: Token.create(newUser)
            });
        }
        catch (error) {
            console.error("error in usersignup", error);
            res.status(500).json({ message: 'error in signup', error: error });
        }
    });
}
exports.signup = signup;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield (0, UserDAO_1.fetchUserByEmail)(email);
            if (!Password.isMatch(password, user.password)) {
                res.send('invalid password');
                return;
            }
            res.status(201).json({
                message: "you're signed in",
                token: Token.create(user)
            });
        }
        catch (error) {
            res.json({ message: 'no account with that email', error: error });
        }
    });
}
exports.signin = signin;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ "message": "log out successful" });
    });
}
exports.logout = logout;
function access(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        if (!Token.verify(token)) {
            res.json({ "signin": false, "message": "you're not authorized" });
            return;
        }
        res.json({ "signin": true, "message": "you're authorized" });
    });
}
exports.access = access;
