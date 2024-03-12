import { PrismaClient,User } from '@prisma/client';


    async function createUser(name:string,email:string,hashedPassword:string):Promise<User>{
        const prisma = new PrismaClient();
        try{
            return await prisma.user.create({
            data:{
                name,
                email,
                password:  hashedPassword,
            },
        });   
    }catch(error){
        console.error("error creating user");
        throw error;
    } finally{
        prisma.$disconnect();
    }
    

    }
    
    async function fetchUserByEmail(email:string):Promise<User>{
        const prisma = new PrismaClient();
        try{
            return await prisma.user.findUniqueOrThrow({
            where:{
                email: email,
            },
        });
    }catch(error){
        console.error("problem finding user",error)
        throw error;
    }finally{
        prisma.$disconnect();
    }

    }
    async function fetchAllUsers():Promise<User[]>{
        const prisma = new PrismaClient();

        try{
            return await prisma.user.findMany();
 
         } catch(error){
            console.error('Error fetching users:', error);
            throw error;
         }finally{
            prisma.$disconnect();
        }

    }

export{
    fetchAllUsers,
    fetchUserByEmail,
    createUser
}