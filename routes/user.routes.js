import express from 'express';
import { registerController, loginController, logoutController } from '../controllers/user.controller.js';
import authenticateUser from '../middlewares/authenticate.middleware.js';

const router = express.Router();

router.route('/signup').post(registerController);

router.route('/signin').post(loginController);

router.post('/logout', authenticateUser, logoutController);  // Protected route

export default router;