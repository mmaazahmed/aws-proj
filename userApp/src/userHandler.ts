import { Request, Response } from 'express';
import { fetchAllUsers,fetchUserByEmail } from './UserDAO';


export async function listUsers(req: Request,res: Response): Promise<void> {

    try{
       const users=await fetchAllUsers();
        res.send(users);

    } catch(error){
        console.error('Error fetching users:', error);
        res.send('Internal Server Error');
    }
}

export async function fetchUser(req: Request, res: Response): Promise<void> {

    const {email}=req.body;
    try{
       const user=await fetchUserByEmail(email);
        res.send(user);

    } catch(error){
        console.error('Error fetching users:', error);
        res.send('Internal Server Error');
    }
}

