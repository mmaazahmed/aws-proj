import { logout,signin,access,signup } from './authService';
import express from 'express';

import { fetchUser,listUsers } from './userHandler';


const router =express.Router();


router.post('/user/register',signup);
router.post('/user/login',signin);
router.post('/user/logout',logout);
router.post('/user/access',access);
router.get('/user/list',listUsers);
router.get('/user/fetch',fetchUser);

export default router;

