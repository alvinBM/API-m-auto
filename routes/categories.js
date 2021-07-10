import express from 'express';
import categoriesController from '../controllers/categoriesController';

const router = express.Router();

router.post('/add', categoriesController.AjouterCategorie)
.delete('/delete/:id', categoriesController.SupprimerCategorie)
.get('/', categoriesController.selectCategorie);

export default router;