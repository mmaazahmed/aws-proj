import { PrismaClient,Product } from '@prisma/client';

 async function createProduct(name:string,description:string,price:number,stock:number):Promise<Product>{
        const prisma = new PrismaClient();

        try{
            return await prisma.product.create({
            data:{
                name,
                description,
                price,
                stock
            },
        });   
    }catch(error){
        console.error("error creating product");
        throw error;
    }finally{
        prisma.$disconnect();
    }
    

    }
    
async function fetchProductById(productId:number):Promise<Product>{
    const prisma = new PrismaClient();

    try{
        return await prisma.product.findUniqueOrThrow({
        where:{
            id: productId,
        },
    });
}catch(error){
    console.error("problem finding product",error)
    throw error;
}finally{
    prisma.$disconnect();
}


}
async function fetchAllProducts():Promise<Product[]> {
    const prisma = new PrismaClient();

    try{
        return await prisma.product.findMany(); 
        } catch(error){
        throw(error);
    }finally{
        prisma.$disconnect();
    }
    

    
}
async function updateProductById(productId:number,name:string,description:string,price:number,stock:number):Promise<Product> {

    const prisma = new PrismaClient();
    try{
        return await prisma.product.update({
            where:{id:productId},
            data:{
                name,
                description,
                price,
                stock
            }
        });
        } catch(error){
        throw(error);
    }finally{
        prisma.$disconnect();
    }
    
}
async function removeProduct(productId:number):Promise<void>{

    const prisma = new PrismaClient();
    try{
        await prisma.product.delete({
            where : {id:productId}
        })
    }catch(error){
        throw error;

    }finally{
        prisma.$disconnect();
    }
    
}

export {
    updateProductById,
    removeProduct,
    createProduct, 
    fetchProductById,
    fetchAllProducts,
}