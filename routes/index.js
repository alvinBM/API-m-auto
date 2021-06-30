import express from 'express';
import user from './user';
import produits from "./produits";
import validationKey from '../middlewares/validateKey';

const router = express.Router();


router.use('/user',validationKey,user)
      .use('/products', produits);

 
export default router