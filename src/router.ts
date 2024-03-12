import { AuthService } from './authService';
import { PrismaClient} from '@prisma/client';
import express, { Request, Response } from 'express';
import { create } from './handlers/productHandlers/createHandler';
import { fetchProduct } from './handlers/productHandlers/fetchHandler';
import { listProducts } from './handlers/productHandlers/listHandler';
import { remove } from './handlers/productHandlers/removeHandler';
import { updateProduct } from './handlers/productHandlers/updateHandler';
import { fetchUser,listUsers } from './handlers/userHandler';

const prisma= new PrismaClient();

AuthService.initializePrisma(prisma);


const router =express.Router();

router.get('/',(res:Response)=>{res.send("welcome");})

router.get('/user/register',AuthService.signup);
router.get('/user/login',AuthService.signin);
router.get('/user/logout',AuthService.logout);
router.get('/user/access',AuthService.access);
router.get('/user/list',listUsers);
router.get('/user/fetch',fetchUser);



router.get('/product/list', listProducts);
router.post('/product/create',create);
router.delete('/product/remove/:id',remove);
router.put('/product/update/:id',updateProduct);
router.get('/product/:id',fetchProduct);

export default router;

