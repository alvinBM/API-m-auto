import express from 'express';
import user from './user';
import validationKey from '../middlewares/validateKey';

const router = express.Router();


router.use('/user',validationKey,user);
      // .use('/products',validationKey,artwork);

 
export default router