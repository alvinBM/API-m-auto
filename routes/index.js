import express from 'express';
import user from './user';
import produits from "./produits";
import validationKey from '../middlewares/validateKey';
import panier from './panier.route';
import client from './client.route';

const router = express.Router();


router.use('/user',validationKey, user)
      .use('/products', produits)
      .use('/paniers', panier)
      .use('/clients', client)

 
export default router