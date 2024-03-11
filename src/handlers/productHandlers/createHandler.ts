import { Request, Response } from 'express';
import  {createProduct}  from '../../dao/ProductDAO';

export async function create(req: Request, res: Response):Promise<void>{
    try{
        const {name,description,price,stock}=req.body;
        await createProduct(name,description,price,stock);
        res.send('product creation success');

    } catch(error){
        console.error('Error creating product:', error);
        res.send('Internal Server Error');
    }

}    
