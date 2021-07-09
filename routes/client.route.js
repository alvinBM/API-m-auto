import express from 'express';
import clients from '../controllers/client.controller';

const router = express.Router();

router
    .get('/', clients.onListing)
    .put('/:clientId', clients.onEditing)
    
export default router;