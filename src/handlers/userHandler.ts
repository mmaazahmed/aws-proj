import { Request, Response } from 'express';
import { fetchAllUsers,fetchUserByEmail,createUser } from '../dao/UserDAO';


export async function listUsers(res: Response): Promise<void> {

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

