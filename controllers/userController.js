import formatDate from 'date-format';
import bcrypt from 'bcryptjs';
import user from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import base64ToImage from 'base64-to-image';
import path from "path";
import helpers from '../helpers/helpers';

dotenv.config();

const userController = {
    login: async (req, res) => {
        let result = await user.findOne({
            where: {
                telephone: req.body.phone
            }
        }).then().catch(er => console.error(er));

        if (result) {
            let is_logged = await bcrypt.compare(req.body.password, result.password);
            if (is_logged) {
                const token = jwt.sign({
                        user_id: result.id,
                        role_id: result.type,
                    },
                    process.env.secret_token, 
                    {
                        expiresIn: process.env.expire_token
                    });
                return res.status(200).json({
                    status: 200,
                    loged: true,
                    token,
                    user: {
                        id: result.id,
                        nom: result.username,
                        email: result.email
                    }
                });
            }
        }
        res.status(200).json({
            status: 400,
            message: "impossible de connectez cette utilisateur"
        });
    },
    register: async (req, res) => {
        let { username,email,phone,photo,password, type } = req.body;
        password = await bcrypt.hash(password, 10);
        let photoName = 'default.png';
        let created = formatDate('yyyy-MM-dd hh:mm:ss', new Date());
        let date = formatDate('yyyy-mm-dd-hh-MM-ss', new Date());

        if (photo) {
            let generator = await helpers.createTokenValue();
            let imageName = generator + '-' + date;
            photoName = imageName + '.png';
        
            var base64Str = photo;
            var pathLink = path.join(__dirname, '../public/uploads/images/');
            var optionalObj = { 'fileName': imageName, 'type': 'png' };
        
            var imageInfo = await base64ToImage(base64Str, pathLink, optionalObj);

            if (imageInfo) {
              console.log('Photo Uploaded');
            } else {
              console.log('Error Photo Upload')
            }
          }

        let result = await user.create({
            username,
            email,
            phone,
            activated : 1,
            password,
            type,
            photo : photoName,
            created: created,
            modified: created,
        }).then().catch(er => console.error(er));
        if (result) {
            return res.status(200).json({
                status: 200,
                result
            });
        }
        res.status(200).json({
            status: 400,
            message: "Impossible d'enregistrer cette utilisateur"
        });
    },
};

export default userController;