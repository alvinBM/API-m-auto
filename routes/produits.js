import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.listerProduits)
        .get("/detail/:id", productController.detailsProduit)
        .get("/category/:category_id", productController.produitParCategorie)
        .post("/product", productController.ajouterProduit)
        .post('/recherche', productController.rechercherProduits)


export default router;