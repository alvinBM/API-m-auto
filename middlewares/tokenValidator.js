import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const validateToken = async (req, res, next) => {
    const _publicToken = req.headers['token'];
    await jwt.verify( _publicToken, process.env.expire_token, (rejected, resolved) => {
        if(rejected){
            res.status(403).json({status: 403, message: "Your session expired !", data: null})
        }else next();
    })
}