import express from 'express';
import panier from '../controllers/panier.controller';

const router = express.Router();

router.post('/', panier.create)// Creation d'un panier
      .get('/:panierId', panier.findOne) // Details d'un panier
      .put('/:panierId', panier.edit)
    

export default router;