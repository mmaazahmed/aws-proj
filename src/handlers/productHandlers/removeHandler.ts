import { Request, Response } from 'express';
import { removeProduct } from '../../dao/ProductDAO';

export async function remove(req: Request, res: Response):Promise<void>{
    try{
        const productId=parseInt(req.params.id,10);
        await removeProduct(productId);
        res.send("product successfully removed");
    }catch(error){
        console.error('product removal failed',error);
        res.send("product deletion failed");
        
    }
}    
