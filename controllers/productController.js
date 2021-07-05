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

    detailsProduit: async (req, res) => {

        let results = await produits.findAll(
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(data => {
                res.status(200).json({ "produits": data });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Aucun produit correspondant"
                });
            });

    },


    produitParCategorie: async (req, res) => {
        let results = await produits.findAll(
            {
                where: {
                    category_id: req.params.category_id
                }
            })
            .then(data => {
                res.status(200).json({ "produits": data });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Aucune category correspondante"
                });
            });

    },


    ajouterProduit: async (req, res) => {
        let results = await produits.create({
            nom: req.body.nom,
            prix: req.body.prix,
            quanitite: req.body.quanitite,
            description: req.body.description,
            category_id: req.body.category_id
        }).then((data) => {
            res.status(200).json({
                status: "200",
                "produits": data
            })
        }).catch(er => console.error(er));
    }


}


export default productController;

