import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.listerProduits)

    .get("/:productId", productController.detailsProduit)
    .get("/category/:category_id", productController.produitParCategorie)
    .post("/", productController.ajouterProduit)
    .get('?', productController.rechercherProduits)
    .delete('/:productId', productController.supprimerProduits)
    .put("/:productId", productController.modifierProduits)


export default router;