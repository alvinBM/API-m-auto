import express from 'express';
import panier from '../controllers/panier.controller';

const router = express.Router();

router.get('/paniers/panierId', panier.findOne);
    

export default router;