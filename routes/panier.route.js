import express from 'express';
import panier from '../controllers/panier.controller';

const router = express.Router();

router.post('/', panier.create); // Creation d'un panier
router.get('/:panierId', panier.findOne);// Details d'un panier
    

export default router;