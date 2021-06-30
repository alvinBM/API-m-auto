import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/userValidation';

const router = express.Router();

router.post('/login',userValidation.login,userController.login)
      .post('/register', userValidation.register,userController.register);
    

export default router;