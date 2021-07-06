import express from 'express';
import user from './user';
import produits from "./produits";
import validationKey from '../middlewares/validateKey';
import panier from './panier.route'

const router = express.Router();


router.use('/user',validationKey,user)
      .use('/products', produits)
      .use('/paniers', panier);

 
export default router