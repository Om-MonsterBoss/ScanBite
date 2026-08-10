import express from 'express';
import { signupController } from '../Controllers/auth.controller.js';


const router=express.Router();


router.post('/signup',signupController);


export default router;