import express from 'express';
import clients from '../controllers/client.controller';
import validateKey from '../middlewares/validateKey';
const router = express.Router();

router
    .get('/', validateKey,clients.onListing)
    .put('/:clientId', validateKey,clients.onEditing)
    .post('/register', validateKey,clients.register)
    .post('/login', validateKey,clients.login)
    
export default router;