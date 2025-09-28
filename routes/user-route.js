import express from 'express';      
import { userController } from '../controller/user-controller.js';

const router=express.Router();
router.get('/user',userController)
export default router;