import formatDate from 'date-format';
import produits from '../models/produits';
import dotenv from 'dotenv';
import base64ToImage from 'base64-to-image';
import path from "path";
import {Op} from 'sequelize';

dotenv.config();

const productController = {

    listerProduits : async (req, res) => {
        let results = await produits.findAll({
            where: {
                status: 1
            }
        }).then((data) => {
            res.status(200).json({
                status : "200",
                "produits" : data
            })
        }).catch(er => console.error(er));

    },

    rechercherProduits : async (req, res) => {

        let query = req.body.query;

        if(query){
            produits.findAll({
                where: {
                    status: 1,
                    nom : {[Op.like]: `%${query}%`}
                }
            }).then((data) => {
                res.status(200).json({
                    status : "200",
                    "produits" : data
                })
            }).catch(er => console.error(er));
        }else{
            res.status(401).json({
                status : "401",
                "desciption" : "Vous devez renseigner le mot clé de la recherche"
            })
        }
    },

    supprimerProduits : async (req, res) => {
        const {productId} = req.params;

        const product = await produits.findOne({
            where: {id: productId}
        });

        if(product){
            product.update({deleted: new Date(), status: 0})
            res.status(200).json({
                status : "200",
                "desciption" : "Produit supprime avec succes"
            }) 

        } else {
            res.status(404).json({
                status : "404",
                "desciption" : "Vous devez renseigner le mot clé de la suppression"
            }) 
        }
    }



}


export default productController;

