import formatDate from 'date-format';
import produits from '../models/produits';
import dotenv from 'dotenv';
import base64ToImage from 'base64-to-image';
import path from "path";

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
            let results = await produits.findAll({
                where: {
                    status: 1,
                    nom : req.body.query
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

        

    }


}


export default productController;

