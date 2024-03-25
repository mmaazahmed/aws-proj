import { Request, Response } from 'express';
import  { createProduct, fetchAllProducts, fetchProductById, removeProduct, updateProductById} from './ProductDAO';

export async function updateProduct(req: Request, res: Response):Promise<void>{
    try{
        const {name,description,price,stock}=req.body;
        const productId=parseInt(req.params.id,10);
        const updatedProduct=await updateProductById(productId,name,description,price,stock);
        res.json(
            {message: "product update successfull", 
            updated_product: updatedProduct
        });
    } catch(error){
        console.error('product update failed', error);
        res.json({message:'product update failed',err:error});
    }
}
   
export async function remove(req: Request, res: Response):Promise<void>{
    try{
        const productId=parseInt(req.params.id,10);
        await removeProduct(productId);
        res.send("product successfully removed");
    }catch(error){
        console.error('product removal failed',error);
        res.json({message:error, info:"product deletion failed"});
        
    }
}    
export async function listProducts(req:Request,res: Response):Promise<void>{

    try{
       const products=await fetchAllProducts();
        res.send(products);

    } catch(error){
        console.error('Error fetching products:', error);
        res.send('Internal Server Error');
    }

}    

export async function fetchProduct(req: Request, res: Response):Promise<void>{
    
    try{
        const productId=parseInt(req.params.id,10);
        const product=await fetchProductById(productId);
        res.send(product);
    }catch(error){
        console.error('product does not exist with that id',error);
        res.json({message:error,info:"no product does not exist with that id"});
        
    }
}


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
