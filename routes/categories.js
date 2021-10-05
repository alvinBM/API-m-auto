import express from 'express';
import CategoriesController from '../controllers/CategoriesController';

const router = express.Router();

router.get('/', CategoriesController.listerCategories)
    .put("/category", CategoriesController.modifierCategories)
    .get("git id", CategoriesController.detailsCategories)

export default router;