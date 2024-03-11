import { Request, Response } from 'express';
import {PrismaClient} from '@prisma/client';
export class UserController{

 
    static async listUsers(req: Request, res: Response): Promise<void> {

        try{
           const users=await UserDAO.fetchAllUsers();
            res.send(users);

        } catch(error){
            console.error('Error fetching users:', error);
            res.send('Internal Server Error');
        }
    }
    static async listTokens(req: Request, res: Response): Promise<void> {
        try{
           const users=await UserController.prisma.userToken.findMany();
            res.send(users);

        } catch(error){
            console.error('Error fetching tokens:', error);
            res.send('Internal Server Error');
        }
    }
}

