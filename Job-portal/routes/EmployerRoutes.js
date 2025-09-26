import express from 'express';
import {register,login,update,profile, delete1} from '../weblayer/controllers/EmployerController.js';
import uploadLogo from '../weblayer/middlewares/uploadLogoMiddleware.js';
import authenticate from '../weblayer/middlewares/authenticateToken.js';

const router = express.Router();

router.post('/register',uploadLogo, register);
router.post('/login', login);
router.patch('/update/:id',authenticate,uploadLogo, update);
router.get('/profile', authenticate,profile);
router.delete('/delete/:id',delete1);
export default router;
