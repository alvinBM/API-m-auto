import express from 'express';
import user from './user';
import produits from "./produits";
import validationKey from '../middlewares/validateKey';
import categories from './categories';

const router = express.Router();


router.use('/user',validationKey,user)
      .use('/products', produits)
      .use('/categories', categories)

 
export default router