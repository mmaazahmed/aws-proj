import { Request, Response } from 'express';
import  {fetchAllProducts}  from '../../dao/ProductDAO';


export async function listProducts(req: Request, res: Response):Promise<void>{

    try{
       const products=await fetchAllProducts();
        res.send(products);

    } catch(error){
        console.error('Error fetching products:', error);
        res.send('Internal Server Error');
    }

}    