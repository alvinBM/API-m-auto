import db from '../config/database';
import Client from '../models/client.model'
import jwt from 'jsonwebtoken';
import formatDate from 'date-format';
import bcrypt from 'bcrypt';
import base64ToImage from 'base64-to-image';
import path from "path";
import helpers from '../helpers/helpers';
import dotenv from 'dotenv';
dotenv.config();

const clientController = {
    onListing: async (req, res) => {
        await Client.findAll({
            where: {
                status: 1
            }
        })
        .then(clients => {
            if(clients)
                res
                  .status(200)
                  .json({status: 200, message: "status ok", content: clients})
            else 
                res
                  .status(404)
                  .json({status: 404, message: "aucune information trouvée"})
        })
        .catch(error => {
            if(error)
                res
                  .status(500)
                  .json({status: 500, message: "une erreur serveur vient de se produire !"})
        })
    },
    onEditing: async (req, res) => {
        const body = req.body;
        await Client.findOne({
            where: {
                id: req.params.clientId ? req.params.clientId : 0
            }
        })
        .then(client => {
            if(client && client instanceof Client){
                client.email = body.email ? body.email : client.email;
                client.nom = body.nom ? body.nom : client.nom;
                client.prenom = body.prenom ? body.prenom : client.prenom;
                client.telephone = body.telephone ? body.telephone : client.telephone;
                client.adresse = body.adresse ? body.adresse : client.adresse;
                client.save()
                res
                  .status(200)
                  .json({status: 200, message: "client modifier avec succès !"})
            }else 
                res
                  .status(404)
                  .json({status: 404, message: `Aucun client avec un id ${req.body.clientId} pour la modification !`})
        })
        .catch(error => {
            console.log(error)
            res
              .status(500)
              .json({status: 500, message: error})
        })
    },
    login: async (req, res) => {
        try {
            await Client.findOne({
                where: {
                    telephone: req.body.telephone
                }
            }).then(result => {
                if (result instanceof Client) {
                    bcrypt.compare(req.body.password, result.password, (e, row) => {
                        if (row) {
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
                                message: "login reussi",
                                data: {
                                    loged: true,
                                    token,
                                    client: result
                                }
                            });
                        }else{
                            res.status(200).json({
                                status: 400,
                                message: "impossible de connectez cet utilisateur car le mot de passe est incorrect !",
                                data: null
                            });
                        }
                    });
  
                }else{
                    res.status(200).json({
                        status: 400,
                        message: "impossible de connectez cet utilisateur le numero n'existe pas !",
                        data: null
                    });
                }
            }).catch(er => {
                res.status(500).json({
                    status: 500,
                    message: "Une erreur vient de se produire",
                    data: er
                });
            });
            
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: "Une erreur vient de se produire",
                data: err
            });
        }
    },
    register: async (req, res) => {
        let { nom, prenom, email,telephone,photo,password, type, status, adresse} = req.body;
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

        let result = await Client.create({
            id: Math.round(Math.random() * 10 * new Date().getMilliseconds()),
            nom,
            email,
            prenom,
            telephone,
            activated : 1,
            password,
            status: status ? status : 1,
            type,
            adresse: adresse ? adresse : "",
            photo : photoName,
            created: created,
            modified: created,
        }).then().catch(er => {
            res.status(200).json({
                status: 400,
                message: "Impossible d'enregistrer cette utilisateur",
                data: er
            });
        });
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "compte crée avec succès",
                data: {
                    client : result
                }
            });
        }
    },
}
export default clientController;