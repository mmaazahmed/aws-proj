import { Request, Response } from 'express';
import { PrismaClient,User } from '@prisma/client';
import { fetchUserByEmail,createUser } from './dao/UserDAO';

import dotenv from 'dotenv';
dotenv.config();

const bcrypt = require('bcrypt');
const validator =require('validator');
const jwt=require('jsonwebtoken');


const Password={
    hash: async (password:string):Promise<string> => (
        await bcrypt.hash(password,await bcrypt.genSalt(2)) ),
        
    isMatch: async (password:string,hashedPassword:string):Promise<boolean>=> (
        await bcrypt.compare(password,hashedPassword))
}
const Token={
    create: (user:User)=>jwt.sign({userId:user.id,email:user.email},process.env.API_KEY,{expiresIn:'1h'}),
    verify: (token:string)=>jwt.verify(token,process.env.API_KEY,(err:any,decoded:any)=>{
        if (err){
            console.error("verification failed");return;
        }
        console.log('Token verified successfully:', decoded);
        return decoded;
    }),


}

    
    
export class AuthService{
    
    private static prisma:PrismaClient;
    
    static initializePrisma(prisma:PrismaClient){
        if(AuthService.prisma){return;}
        AuthService.prisma=prisma;
    }
    
    constructor(prisma:PrismaClient){
        if(!AuthService.prisma){
            AuthService.prisma=prisma;
        }
        
    }
    static async signup(req: Request, res: Response): Promise<void>{
        const { name,email,password}=req.body;
        
        try{
            if (!(validator.isEmail(email)&&password&&name)){
                res.status(400).json({message:"invalid email,passwrod,name"});
                return;
            }
            const user= await fetchUserByEmail(email);
            
            if (user){ res.status(409).json({message:'email already in use'}); return;}
            
            const newUser=await createUser(name,email,await Password.hash(password));
      
            res.status(201).json({
                message:"account created successfully",
                token: Token.create(newUser)
            });

        }catch(error){
            console.error("error in usersignup",error);
            res.status(500).send('Internal server error');
       }
}
    static async signin(req: Request, res: Response): Promise<void>{
        const {email,password}=req.body;
        try{
            const user=await fetchUserByEmail(email);
            
            if(!Password.isMatch(password,user.password)){
                res.send('invalid password');
                return;
            }
            res.status(201).json({
                message:"you're signed in",
                token: Token.create(user)
            });
        }catch(error){
            res.send('no account with that email');
        }

    }
    static async logout(req: Request, res: Response): Promise<void>{
        res.status(200).json({"message":"log out successful"});
    }
    static async access(req:Request,res:Response):Promise<void>{
        const {token}=req.body;
        if (!Token.verify(token)){
            res.json({"signin":false,"message":"you're not authorized"});
            return;
        }
        res.json({"signin":true,"message":"you're authorized"});
        

    }
}