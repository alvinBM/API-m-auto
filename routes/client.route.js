import express from 'express';
import clients from '../controllers/client.controller';
import { validateToken } from '../middlewares/tokenValidator';

const router = express.Router();

router
    .get('/', validateToken,clients.onListing)
    .put('/:clientId', clients.onEditing)
    .post('/register', clients.register)
    .post('/login', clients.login)
    
export default router;