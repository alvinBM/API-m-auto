import formatDate from 'date-format';
import produits from '../models/produits';
import dotenv from 'dotenv';
import base64ToImage from 'base64-to-image';
import path from "path";
import { Op } from 'sequelize';
import database from '../config/database';

dotenv.config();

const productController = {
//     // runrow
//     listerProduits: async () => {
        
//     //    await database.query("ALTER TABLE `products` ADD `imgcover` VARCHAR(60) NOT NULL AFTER `nom`")
//        await database.query("UPDATE `products` SET `imgcover` = 'toyota.jpg' WHERE id = 4")
//         .then(d => {
//             console.log(d);
// // CD Player	Sun Roof	Leather Seat	Alloy Wheels Power Steering	Power Window	A/C	ABS Airbag	Radio	CD Changer	DVD TV	Power Seat	Back Tire	Grill GuardRear Spoiler	Central Locking	Jack	Spare Tire Wheel Spanner	Fog Lights	Back Camera	Push Start Keyless Entry	ESC	360 Degree Camera	Body Kit   Side Airbag	Power Mirror	Side Skirts	Front Lip Spoiler Navigation Turbo
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     },
    listerProduits : async (req, res) => {
         let results = await produits.findAll({
            // where: {
            //     status: 1
            // }
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
            produits.findAll({
                where: {
                    // status: 1,
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
                "desciption": "Vous devez renseigner le mot clé de la recherche"
            })
        }
    },

    supprimerProduits : async (req, res) => {
        const {productId} = req.params;

        const product = await produits.findOne({
            where: {id: productId}
        });
    },

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
                res.status(200).json({ status: 200, message: "Ok", data });
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

        const product = await produits.findOne({
            where: { id: productId }
        });


    },

    modifierProduits: async(req, res) => {

        Produits.hasMany(Categories, { foreignKey: "id" });
        Categories.belongsTo(Produits, { foreignKey: "produits_id" });

        await Produits.findOne({
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
                    res
                        .status(200)
                        .json({ status: 200, message: "Produit modifié avec succès !" })
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