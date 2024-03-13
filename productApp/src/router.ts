import express, {Response } from 'express';
import { create,listProducts,fetchProduct,remove,updateProduct} from './productHandler';


const router =express.Router();

// router.get('/',(res:Response)=>{res.send("welcome");})


router.get('/product/list', listProducts);
router.get('/product/:id',fetchProduct);
router.post('/product/create',create);
router.delete('/product/remove/:id',remove);
router.put('/product/update/:id',updateProduct);

export default router;

