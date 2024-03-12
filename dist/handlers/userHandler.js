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
exports.fetchUser = exports.listUsers = void 0;
const UserDAO_1 = require("../dao/UserDAO");
function listUsers(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, UserDAO_1.fetchAllUsers)();
            res.send(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.send('Internal Server Error');
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
// export async function createNewUser(req: Request, res: Response):Promise<void>{
//    const {name,email,password}=req.body;
//     try{
//         createUser(name,email,password);
//         res.send('created new user');
//     }catch(error){
//         console.error("user creation failed",error);
//         res.send("user creation failed")
//     }
// }
// export async function listUsers(req: Request, res: Response): Promise<void> {
//     try{
//        const users=await fetchAllUsers();
//         res.send(users);
//     } catch(error){
//         console.error('Error fetching users:', error);
//         res.send('Internal Server Error');
//     }
// }
