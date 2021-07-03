import express from 'express';
import panier from '../controllers/panier.controller';

const router = express.Router();

router.post('/', panier.create) // Creation d'un panier
      .get('/:panierId', panier.findOne) // Details d'un panier
      .put('/:panierId', panier.onEdit) // Edit panier
      .delete('/:panierId', panier.onDelete) // supp panier
      .put('/delivery/:panierId', panier.onSuccessDelivery) // la commande a ete validée le status devient ==== 2 
    
export default router;