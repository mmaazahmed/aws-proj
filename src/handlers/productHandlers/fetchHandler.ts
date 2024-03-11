import { Request, Response } from 'express';
import  {fetchProductById}  from '../../dao/ProductDAO';


export async function fetchProduct(req: Request, res: Response):Promise<void>{
    
    try{
        const productId=parseInt(req.params.id,10);
        const product=await fetchProductById(productId);
        res.send(product);
    }catch(error){
        console.error('product does not exist with that id',error);
        res.send("no product does not exist with that id");
        
    }
}
