import formatDate from 'date-format';
import produits from '../models/produits';
import dotenv from 'dotenv';
import Categories from '../models/categories'
import base64ToImage from 'base64-to-image';
import path from "path";
import { Op } from 'sequelize';
import database from '../config/database';

dotenv.config();

const productController = {

    listerProduits : async (req, res) => {
        await produits.findAll({
            where: {
                status: 1
            }
        }).then((data) => {
            res.status(200).json({
                status: "200",
                message: "ok",
                data
            })
        }).catch(er => console.error(er));
    },
    
    rechercherProduits : async (req, res) => {

        let query = req.body.query;

        if(query){
            await produits.findAll({
                where: {
                    status: 1,
                    nom : {[Op.like]: `%${query}%`}
                }
            }).then((data) => {
                res.status(200).json({
                    status: "200",
                    message: "ok",
                    data
                })
            }).catch(er => console.error(er));
        } else {
            res.status(401).json({
                status: "401",
                message: "Vous devez renseigner le mot clé de la recherche",
                data: null
            })
        }
    },


    supprimerProduits : async (req, res) => {
        const {productId} = req.params;

        await produits.findOne({
            where: {
                id: productId,
                status: 1
            }
        })
        .then(prd => {
            if(prd instanceof produits){
                prd.status = 0;
                prd.save().then(resolve => {
                    res.status(200)
                    .json({status: 200, message: "Produit modifier avec succes", data: prd})
                })
                .catch(err => {
                    res.status(404).json({status: 404, message: "ce produit n'existe pas dans la base pour la suppression !", data: null})
                })

            }else{
                res.status(404).json({status: 404, message: "ce produit n'existe pas dans la base pour la suppression !", data: null})
            }
        })
        .catch(err => {
            res.status(500).json({status: 500, message: "une erreur serveur vient de se produire !", data: err})
        })
    },

    detailsProduit: async (req, res) => {

        await produits.findAll(
            {
                where: {
                    id: parseInt(req.params.id),
                    status: 1
                }
            }
        )
            .then(data => {
                if(data instanceof produits){
                    res.status(200).json({ data, message: "Ok", status: 200 });
                }else{
                    res.status(404).json({ data: null, message: "produit n'existe pas", status: 404 });
                }
            })
            .catch(err => {
                res.status(500).send({
                    status: 500,
                    data: null,
                    message: "Aucun produit correspondant"
                });
            });

    },

    produitParCategorie: async (req, res) => {
        await produits.findAll(
            {
                where: {
                    category_id: req.params.category_id,
                    status: 1
                }
            })
            .then(data => {
                if(data instanceof produits){
                    res.status(200).json({ status: 200, message: "Ok", data });
                }else{
                    res.status(200).json({ status: 200, message: "Aucun produit trouve", data: null });
                }
            })
            .catch(err => {
                res.status(500).send({
                    status: 500,
                    message: "Aucune category correspondante",
                    data: err
                });
            });

    },

    ajouterProduit: async (req, res) => {
        await produits.create({
            nom: req.body.nom,
            prix: req.body.prix,
            quanitite: req.body.quanitite,
            description: req.body.description,
            category_id: req.body.category_id
        }).then((data) => {
            res.status(200).json({
                status: "200",
                data,
                message: "OK"
            })
        }).catch(er => {
            res.status(500)
            .json({message: "une erreur vient de se produire", status: 500, data: null})
        });

    },

    modifierProduits: async(req, res) => {

        produits.hasMany(Categories, { foreignKey: "id" });
        Categories.belongsTo(produits, { foreignKey: "produits_id" });

        await produits.findOne({
                where: {
                    id: req.params.ProduitsId,
                    categories_id: req.body.categories_id,
                },
                include: [{
                    model: Produits,
                    required: true,
                    as: 'Produits'
                }, ],
            })
            .then(mproduits => {
                if (mproduits && mproduits instanceof Produits) {
                    mproduits = req.body
                    mproduits.save()
                    .then(resolve => {
                        res
                        .status(200)
                        .json({ status: 200, message: "Produit modifié avec succès !" })
                    })
                    .catch(error => {
                        res
                        .status(500)
                        .json({ status: 500, message: error.hasOwnProperty('sqlMessage') ? error['sqlMessage'] : "erreur inconnue du serveur !" })
                    })

                } else {
                    res
                        .status(404)
                        .json({ status: 404, message: "aucun resultat trouvé pour la modification !" })
                }
            })
            .catch(error => {
                res
                    .status(500)
                    .json({ status: 500, message: error.hasOwnProperty('sqlMessage') ? error['sqlMessage'] : "erreur inconnue du serveur !" })
            })
    }
}

export default productController;