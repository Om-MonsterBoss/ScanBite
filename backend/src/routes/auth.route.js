import express from 'express';
import { loginController, logoutController, refreshController, sessionController, signupController } from '../Controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', protectRoute, logoutController);
router.post('/refresh', refreshController);
router.get('/session', protectRoute, sessionController);

export default router;