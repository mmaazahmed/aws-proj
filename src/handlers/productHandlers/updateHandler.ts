import { Request, Response } from 'express';
import  { updateProductById} from '../../dao/ProductDAO';

export async function updateProduct(req: Request, res: Response):Promise<void>{
    try{
        const {name,description,price,stock}=req.body;
        const productId=parseInt(req.params.id,10);
        const updatedProduct=await updateProductById(productId,name,description,price,stock);
        res.send('product update success').json(updatedProduct);
    } catch(error){
        console.error('product update failed', error);
        res.send('product update failed');
    }
}
   

// export async function updateProduct(event:APIGatewayProxyEvent):Promise<APIGatewayProxyResult>{
//     try{
//         const {id,name,description,price,stock}=JSON.parse(event.body || '{}');
//         const productId=parseInt(id,10);
//         const updatedProduct=await updateProductById(productId,name,description,price,stock);
//         return {
//             statusCode: 200,
//             body: JSON.stringify(
//                 { message: 'Create operation successful', "Updatedproduct":updatedProduct }
//                 )
//             };
//     } catch(error){
//        return{
//         statusCode: 500,

//         body: JSON.stringify({ 
//             message: 'Create operation unsuccessful'
//             })
//         };
//        }

//     }
   