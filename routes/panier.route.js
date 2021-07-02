import express from 'express';
import panier from '../controllers/panier.controller';

const router = express.Router();

router.get('/panierId', panier.findOne);
    

export default router;