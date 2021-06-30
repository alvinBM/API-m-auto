import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/',productController.listerProduits)
        .post('/recherche', productController.rechercherProduits)
    

export default router;