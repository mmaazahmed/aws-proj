/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(1));
const serverless_http_1 = __importDefault(__webpack_require__(2));
const router_1 = __importDefault(__webpack_require__(3));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.json());
app.use('/api', router_1.default);
module.exports.handler = (0, serverless_http_1.default)(app);
exports["default"] = app;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("serverless-http");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const authService_1 = __webpack_require__(4);
const express_1 = __importDefault(__webpack_require__(1));
const userHandler_1 = __webpack_require__(11);
const router = express_1.default.Router();
router.post('/user/register', authService_1.signup);
router.post('/user/login', authService_1.signin);
router.post('/user/logout', authService_1.logout);
router.post('/user/access', authService_1.access);
router.get('/user/list', userHandler_1.listUsers);
router.get('/user/fetch', userHandler_1.fetchUser);
exports["default"] = router;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logout = exports.signup = exports.signin = exports.access = void 0;
const UserDAO_1 = __webpack_require__(5);
const dotenv_1 = __importDefault(__webpack_require__(7));
dotenv_1.default.config();
const bcrypt = __webpack_require__(8);
const validator = __webpack_require__(9);
const jwt = __webpack_require__(10);
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


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createUser = exports.fetchUserByEmail = exports.fetchAllUsers = void 0;
const client_1 = __webpack_require__(6);
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


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("validator");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchUser = exports.listUsers = void 0;
const UserDAO_1 = __webpack_require__(5);
function listUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, UserDAO_1.fetchAllUsers)();
            res.send(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.json({ message: 'Internal Server Error', error: error });
        }
    });
}
exports.listUsers = listUsers;
function fetchUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield (0, UserDAO_1.fetchUserByEmail)(email);
            res.send(user);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.send('Internal Server Error');
        }
    });
}
exports.fetchUser = fetchUser;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;